import { Container } from 'native-base'
import React, { Component } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import { getDimensions } from '../../../common/dimension-utils'
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

  _renderItem = ({ item: professional, index }) => <Professional.XL key={ index } professional={ professional } navigation = { this.props.navigation }/>

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
                titleStyle={ { color: '#fff', marginTop: 12 } }
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
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  content: {
    flex: 1
  },
  pageTitleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  },
  infoHeader: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 12
  },
  smallText: {
    fontSize: 12
  },
  headerTitle: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },
  listItem: {
    flexDirection: 'column',
    width: 300,
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
    width: 150,
    height: 150,
    marginTop: 8,
    borderRadius: 8
  },
  countryFlag: {
    width: 60,
    height: 45,
    marginTop: 16
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
    fontSize: 16,
    fontFamily: 'Helvetica',
    textAlign: 'center'
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 4
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
})

const mapStateToProps = state => {
  return {
    defaultProfessionals: state.search.defaults.professionals,
    professionals: state.search.professionals
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalPage)

