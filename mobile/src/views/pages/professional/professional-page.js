import { Container } from 'native-base'
import React, { Component } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { getDimensions } from '../../../common/dimension-utils'
import * as globalActions from '../../../global/actions'
import { NavigationHeader } from '../../components/header/header'
import { ImagePageContainer } from '../../design/image-page-container'
import { ProfessionalCard } from './components/professional-card'
import Professional from '../../components/professional/professional-cards'

class ProfessionalPage extends Component {

  state = {
    currentIndex: this.findItemIndex()
  }

  findItemIndex () {
    const item = this.props.navigation.getParam('professional', {})
    return this.professionals.findIndex(pr => pr.id === item.id)
  }

  componentDidMount () {
    const index = this.findItemIndex()
    this.setState({
      currentIndex: index
    })

    Dimensions.addEventListener('change', this.handleDimensionsChange)
  }

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
  }

  handleDimensionsChange = () => {
    this.forceUpdate()
  }

  get professionals () {
    const defaults = this.props.navigation.getParam('defaults', false)
    return defaults ? this.props.defaultProfessionals : this.props.professionals
  }

  _renderItem = ({ item: professional, index }) => <Professional.XL key={ index } onLinkError={this.props.showError} professional={ professional } navigation = { this.props.navigation }/>

  render () {
    const { itemWidth, sliderWidth } = getDimensions()
    const showSingle = this.props.navigation.getParam('single', false)
    return (
      <ImagePageContainer>
        <View style={ styles.content }>
          <ScrollView>
            <NavigationHeader
              onBack={ () => this.props.navigation.goBack() }
              title={ I18n.t('professional_page.title') }
              rightIconSource={ WhiteLogo }/>
            <View style={ { marginTop: 32 } }>
              { showSingle && (
                <Carousel
                  ref={ (c) => { this._carousel = c } }
                  data={ [this.props.navigation.getParam('professional', {})] }
                  keyExtractor={item => String(item.id)}
                  renderItem={ this._renderItem }
                  sliderWidth={ sliderWidth }
                  itemWidth={ itemWidth }
                />
              ) }
              { !showSingle && (
                <React.Fragment>
                  <Carousel
                    ref={ (c) => { this._carousel = c } }
                    data={ this.professionals }
                    keyExtractor={item => String(item.id)}
                    initialNumToRender={200}
                    renderItem={ this._renderItem }
                    sliderWidth={ sliderWidth }
                    firstItem={ this.state.currentIndex }
                    itemWidth={ itemWidth }
                    onBeforeSnapToItem={ index => this.setState({ currentIndex: index }) }
                  />
                  { this.professionals.length < 8 && (
                  <Pagination
                    dotColor={ 'rgba(255, 255, 255, 0.95)' }
                    inactiveDotColor={ 'rgba(255,255,255,0.75)' }
                    activeDotIndex={ this.state.currentIndex } dotsLength={ this.professionals.length }/>
                  )}
                </React.Fragment>
              ) }
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
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  },
  underline: {
    textDecorationLine: 'underline'
  }
})

const mapStateToProps = state => {
  return {
    defaultProfessionals: state.search.defaults.professionals,
    professionals: state.search.professionals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showError: mes => dispatch(globalActions.showAlertError(mes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPage)
