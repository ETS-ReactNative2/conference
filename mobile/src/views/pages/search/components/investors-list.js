import { Button, Container, Left, List, ListItem, Right, Text, Thumbnail, View, } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import ColorLogo from '../../../../assets/logos/conference_logo_welcome_medium.png'
import { FUNDING_STAGES, REGIONS, TICKET_SIZES, TOKEN_TYPES } from '../../../../enums.js'
import { PAGES_NAMES } from '../../../../navigation'
import * as searchActions from '../../../../search/actions'

class InvestorsList extends React.Component {
  state = {
    defaults: {}
  }

  componentWillReceiveProps (nextProps) {
    const { filters, updateInvestors } = this.props

    if (filters !== nextProps.filters) {
      updateInvestors(nextProps.filters)
    }
  }

  handleClickFilter = () => {
    this.props.navigation.navigate(PAGES_NAMES.INVESTOR_MAIN_FILTER_PAGE)
  }

  render () {
    return (
      <Container style={ { flex: 1, backgroundColor: 'transparent' } }>
        <ScrollView contentContainerStyle={ { paddingTop: 8 } } style={ styles.scrollView }>
          <View style={ styles.headerContainer }>
            { this.props.profiles.length === 0 &&
            <Text style={ styles.comment }>{ I18n.t('search_page.no_profile') }</Text> }
            <Button
              transparent
              style={ styles.fullWidth }
              onPress={ this.handleClickFilter }>
              <Text style={ [ styles.underline, styles.centerText, styles.largeText, styles.fullWidth ] }>{ I18n.t(
                'search_page.update_filter') }</Text>
            </Button>
          </View>
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile => {
                return (
                  <InvestorItem key={ profile.id } investor={ profile } onMark={ () => {} }
                                onClick={ () => this.props.onClick(profile) }/>
                )
              })
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}

InvestorItem = ({ investor, onClick }) => {
  const avatar = investor.user && investor.user.imageUrl
    ? { uri: `${investor.user.imageUrl}?w=200&h=200` }
    : ColorLogo
  const firstName = investor.user.firstName
  const lastName = investor.user.lastName
  const ticketCount = investor.ticketSizes.length
  const minTicketSize = ticketCount > 0 ? TICKET_SIZES[ investor.ticketSizes[ 0 ] - 1 ].minlabel : ''
  const maxTicketSize = ticketCount > 0 ? TICKET_SIZES[ investor.ticketSizes[ ticketCount - 1 ] - 1 ].maxlabel : ''

  const moneyRange = minTicketSize + ' ~ ' + maxTicketSize

  return (
    <ListItem thumbnail onPress={ onClick } style={ styles.listItem }>
      <Left>
        <Thumbnail square large style={ styles.portrait } source={ avatar }/>
        <Flag style={ styles.countryFlag } code={ investor.nationality }/>
      </Left>
      <View style={ { flex: 1 } }>
        <View style={ styles.rowHeader }>
          <Left>
            <Text style={ styles.largeText }>{ `${firstName} ${lastName}` }</Text>
          </Left>
          <Right>
            <Text style={ styles.normalText }>{ moneyRange }</Text>
          </Right>
        </View>
        <View style={ styles.rowDetail }>
          <View style={ { flex: 1 } }>
            {
              investor.tokenTypes.map(index => {
                const stage = TOKEN_TYPES.find(item => item.index === index)

                if (stage) {
                  return (
                    <Text key={ index } style={ styles.normalText }>
                      {
                        I18n.t(`common.token_types.${stage.slug}`)
                      }
                    </Text>
                  )
                }
              })
            }
          </View>
          <View style={ { flex: 0.8 } }>
            {
              investor.fundingStages.map(index => {
                const stage = FUNDING_STAGES.find(item => item.index === index)

                if (stage) {
                  return (
                    <Text key={ index } style={ styles.normalText }>
                      {
                        I18n.t(`common.funding_stages.${stage.slug}`)
                      }
                    </Text>
                  )
                }
              })
            }
          </View>
          <View style={ { flex: 0.5 } }>
            {
              investor.region === 4 ? (
                <Text style={ styles.normalText }>{ investor.regionOtherText }</Text>
              ) : (
                <Text style={ styles.normalText }>
                  {
                    investor.region ? I18n.t(`common.regions.${REGIONS.find(item => item.index === investor.region).slug}`) : ''
                  }
                </Text>
              )
            }
          </View>
        </View>
      </View>
    </ListItem>
  )
}

const styles = EStyleSheet.create({
  centerText: {
    textAlign: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#00000000'
  },
  listItem: {
    height: 100,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    overflow: 'hidden'
  },
  portrait: {
    width: 97,
    height: 100
  },
  countryFlag: {
    width: 15,
    height: 20,
    padding: 0,
    marginLeft: -15,
    marginTop: 'auto',
    marginBottom: -3
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 18
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginRight: 18,
    marginBottom: 11
  },
  normalText: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    textAlign: 'left'
  },
  largeText: {
    fontSize: 14,
    fontFamily: 'Helvetica'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  comment: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Helvetica',
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center',
    color: 'white'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

InvestorsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateInvestors: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.investors,
    filters: state.filter.investor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInvestors: filters => dispatch(searchActions.updateInvestors(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorsList)
