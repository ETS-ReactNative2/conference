import { Button, Container, List, Text, View, } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../../locales/i18n'
import {
  FUNDING_STAGES,
  REGIONS,
  TICKET_SIZES,
  TOKEN_TYPES
} from '../../../../enums.js'
import { PAGES_NAMES } from '../../../../navigation'
import Investor from '../../../components/investor/investor-cards'

class InvestorsList extends React.Component {

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
              this.props.profiles
                .filter(prof => !prof.hide)
                .map(profile => {
                return (
                  <Investor.Medium
                    key={ profile.id }
                    investor={ profile }
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
  onClick: PropTypes.func.isRequired
}

export default InvestorsList
