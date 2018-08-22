import {
  Body, Button, Col, Card, CardItem, Container, Grid, Header, Footer, Icon, Left, List, ListItem, Thumbnail, Right, Text, View,
} from 'native-base';
import { ScrollView, ListView, Image } from 'react-native';
import Flag from 'react-native-flags';
import React from 'react';
import { connect } from 'react-redux';
import EStyleSheet from 'react-native-extended-stylesheet';
import PropTypes from 'prop-types';
import * as searchActions from '../../../../search/actions';
import Filters from './filters';
import { FUNDING_STAGES, TOKEN_TYPES, REGIONS, TICKET_SIZES } from '../../../../enums.js';
import I18n from '../../../../../locales/i18n'

class InvestorsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilters: false,
      defaults: {}
    }
  }

  handleShowFilter = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  handleSearch = newDefaults => {
    this.setState({
      showFilters: false,
      defaults: {
        ...this.state.defaults,
        ...newDefaults
      }
    }, () => {
      this.props.updateInvestors(newDefaults)
    })
  }

  render () {
    const { showFilters, defaults } = this.state;

    const comment = this.props.profiles.length === 0
      ? I18n.t('search_page.no_profile')
      : I18n.t('search_page.change_profile');

    return (
      <Container style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile => {
                return (
                  <InvestorItem key={ profile.id } investor={ profile } onMark={ () => {}} onClick={() => this.props.onClick(profile)} />
                )
              })
            }
          </List>
          <View style={styles.footerContainer}>
            <Text style={styles.comment}>{ comment }</Text>
            <Button
              transparent
              style={styles.fullWidth}
              dark={!showFilters}
              info={showFilters}
              onPress={ this.handleShowFilter }>
              <Text style={[styles.underline, styles.centerText, styles.largeText, styles.fullWidth]}>{I18n.t('search_page.update_filter')}</Text>
            </Button>
          </View>
          {showFilters && (
            <Filters defaults={ defaults } onSearch={ this.handleSearch } navigation={this.props.navigation} />
          )}
        </ScrollView>
      </Container>
    )
  }
}

InvestorItem = ({ investor, onMark, onClick }) => {
  const portraitPlaceholderUri = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';
  const firstName = investor.user.firstName;
  const lastName = investor.user.lastName;
  const ticketCount = investor.ticketSizes.length;
  const minTicketSize = TICKET_SIZES[investor.ticketSizes[0] - 1].minlabel;
  const maxTicketSize = TICKET_SIZES[investor.ticketSizes[ticketCount - 1] - 1].maxlabel;
  const moneyRange = minTicketSize + ' ~ ' + maxTicketSize;

  return (
    <ListItem thumbnail onPress={ onClick } style={styles.listItem} >
      <Left>
        <Thumbnail square large style={styles.portrait} source={{uri: portraitPlaceholderUri}} />
        <Flag style={styles.countryFlag} code={investor.nationality} />
      </Left>
      <View style={{flex: 1}}>
        <View style={styles.rowHeader}>
          <Left>
            <Text style={styles.largeText}>{`${firstName} ${lastName}`}</Text>
          </Left>
          <Right>
            <Text style={styles.normalText}>{moneyRange}</Text>
          </Right>
        </View>
        <View style={styles.rowDetail}>
          <View style={{flex: 1}}>
            {
              investor.tokenTypes.map(index => {
                const stage = TOKEN_TYPES.find(item => item.index === index);

                if(stage) {
                  return (
                    <Text style={styles.normalText}>
                      {
                        I18n.t(`common.token_types.${stage.slug}`)
                      }
                    </Text>
                  )
                }
              })
            }
          </View>
          <View style={{flex: 0.8}}>
            {
              investor.fundingStages.map(index => {
                const stage = FUNDING_STAGES.find(item => item.index === index);

                if(stage) {
                  return (
                    <Text style={styles.normalText}>
                      {
                        I18n.t(`common.funding_stages.${stage.slug}`)
                      }
                    </Text>
                  )
                }
              })
            }
          </View>
          <View style={{flex: 0.5}}>
            {
              investor.region === 4 ? (
                <Text style={styles.normalText}>{investor.regionOtherText}</Text>
              ) : (
                <Text style={styles.normalText}>
                  {
                    I18n.t(`common.regions.${REGIONS.find(item => item.index === investor.region).slug}`)
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
    backgroundColor: '#f5f5f5',
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
    shadowRadius: 3
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
    fontSize: 11,
    marginLeft: 16,
    marginRight: 18
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
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
    textAlign: 'center'
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

InvestorsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateInvestors: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.investors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInvestors: filters => dispatch(searchActions.updateInvestors(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorsList)
