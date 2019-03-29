import React, { Component } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel from 'react-native-snap-carousel'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { getDimensions } from '../../../common/dimension-utils'
import * as globalActions from '../../../global/actions'
import { NavigationHeader } from '../../components/header/header'
import Professional from '../../components/professional/professional-cards'
import { ImagePageContainer } from '../../design/image-page-container'

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

  handleDimensionsChange = this.forceUpdate

  get professionals () {
    const defaults = this.props.navigation.getParam('defaults', false)
    return defaults ? this.props.defaultProfessionals : this.props.professionals
  }

  _renderItem = ({ item: professional, index }) => <Professional.XL key={ index } onLinkError={ this.props.showError }
                                                                    professional={ professional }
                                                                    navigation={ this.props.navigation }/>

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
              <Carousel
                ref={ (c) => { this._carousel = c } }
                data={ showSingle ? [ this.props.navigation.getParam('professional', {}) ] : this.professionals }
                keyExtractor={ item => String(item.id) }
                initialNumToRender={ 200 }
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
