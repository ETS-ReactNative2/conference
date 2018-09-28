import React, { Component } from 'react'
import { ScrollView, View, Dimensions } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { globalActions } from '../../../global'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { getDimensions } from '../../../common/dimension-utils'
import { NavigationHeader } from '../../components/header/header'
import { ImagePageContainer } from '../../design/image-page-container'
import Investor from '../../components/investor/investor-cards'

class InvestorPage extends Component {

  state = {
    currentIndex: this.findInvestorIndex(),
  }

  findInvestorIndex () {
    const investor = this.props.navigation.getParam('investor', {})
    const index = this.investors.findIndex(inv => inv.id === investor.id)
    return index
  }

  componentDidMount () {
    const index = this.findInvestorIndex()
    this.setState({
      currentIndex: index
    })
    Dimensions.addEventListener('change', this.handleDimensionsChange)
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
  }

  handleDimensionsChange = this.forceUpdate

  handleMessageClick = investor => {
    this.props.openMessage(investor)
  }

  get investors () {
    const defaults = this.props.navigation.getParam('defaults', false)
    return defaults ? this.props.defaultInvestors : this.props.investors
  }

  _renderItem = ({ item: investor, index }) => {
    const canShowMessaging = this.props.project !== null
    return <Investor.XL key={ index } investor={ investor } showMessage={canShowMessaging} onMessageClick={ () => this.handleMessageClick(investor) }/>
  }

  render () {
    const { itemWidth, sliderWidth } = getDimensions()
    const showSingle = this.props.navigation.getParam('single', false)
    return (
      <ImagePageContainer>
          <View style={ styles.content }>
            <ScrollView>
              <NavigationHeader
                onBack={ () => this.props.navigation.goBack() }
                title={ I18n.t('investor_page.title') }
                rightIconSource={ WhiteLogo }/>
              <View style={ { marginTop: 32 } }>
                  <Carousel
                    keyExtractor={item => String(item.id)}
                    ref={ (c) => { this._carousel = c } }
                    data={ showSingle ? [ this.props.navigation.getParam('investor', {}) ] : this.investors }
                    initialNumToRender={50}
                    renderItem={ this._renderItem }
                    sliderWidth={ sliderWidth }
                    itemWidth={ itemWidth }
                  />
              </View>
            </ScrollView>
          </View>
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1
  }
})

const mapStateToProps = state => {
  return {
    defaultInvestors: state.search.defaults.investors,
    investors: state.search.investors,
    project: state.profile.project
  }
}

const mapDispatchToProps = dispatch => {
  return {
    openMessage: investor => dispatch(globalActions.showMessage(investor))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorPage)

