import { Button, Container, Text, View, } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../../locales/i18n'
import { PAGES_NAMES } from '../../../../navigation'
import Investor from '../../../components/investor/investor-cards'

class InvestorsList extends React.Component {

  handleClickFilter = () => {
    this.props.navigation.navigate(PAGES_NAMES.INVESTOR_MAIN_FILTER_PAGE)
  }

  render () {
    const { profiles: investors, filters, updateInvestors } = this.props
    return (
      <Container style={ { flex: 1, backgroundColor: 'transparent' } }>
        <FlatList
          onRefresh={ () => updateInvestors(filters) }
          refreshing={ false }
          ListHeaderComponent={
            <View style={ styles.headerContainer }>
              { investors.length === 0 &&
              <Text style={ styles.comment }>{ I18n.t('search_page.no_profile') }</Text> }
              <Button
                transparent
                style={ styles.fullWidth }
                onPress={ this.handleClickFilter }>
                <Text style={ [ styles.underline, styles.centerText, styles.largeText, styles.fullWidth ] }>{ I18n.t(
                  'search_page.update_filter') }</Text>
              </Button>
            </View>
          }
          style={ styles.scrollView }
          data={ investors.filter(investor => !investor.hide) }
          keyExtractor={ item => item.id }
          renderItem={ ({ item }) => (
            <Investor.Medium key={ item.id } investor={ item }
                             onClick={ () => this.props.onClick(item) }/>
          ) }
        />
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
