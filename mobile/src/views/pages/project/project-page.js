import React, { Component } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { getDimensions } from '../../../common/dimension-utils'
import * as globalActions from '../../../global/actions'
import { NavigationHeader } from '../../components/header/header'
import Project from '../../components/project/project-cards'
import { ImagePageContainer } from '../../design/image-page-container'

class ProjectPage extends Component {

  state = {
    currentIndex: this.findItemIndex()
  }

  findItemIndex () {
    const item = this.props.navigation.getParam('project', {})
    return this.projects.findIndex(pr => pr.id === item.id)
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

  get projects () {
    const defaults = this.props.navigation.getParam('defaults', false)
    return defaults ? this.props.defaultProjects : this.props.projects
  }

  _renderItem = ({ item: project, index }) =>
    <Project.XL
      key={ index }
      project={ project }
      onLinkError={ this.props.showError}
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
              title={ I18n.t('project_page.title') }
              rightIconSource={ WhiteLogo }/>
            <View style={ { marginTop: 32 } }>
              { showSingle && (
                <Carousel
                  ref={ (c) => { this._carousel = c } }
                  data={ [ this.props.navigation.getParam('project', {}) ] }
                  renderItem={ this._renderItem }
                  sliderWidth={ sliderWidth }
                  itemWidth={ itemWidth }
                  keyExtractor={ item => String(item.id) }
                />
              ) }
              { !showSingle && (
                <React.Fragment>
                  <Carousel
                    ref={ (c) => { this._carousel = c } }
                    data={ this.projects }
                    renderItem={ this._renderItem }
                    initialNumToRender={ 50 }
                    sliderWidth={ sliderWidth }
                    firstItem={ this.state.currentIndex }
                    itemWidth={ itemWidth }
                    keyExtractor={ item => String(item.id) }
                    onBeforeSnapToItem={ index => this.setState({ currentIndex: index }) }
                  />
                  { this.projects.length < 8 &&
                  <Pagination
                    dotColor={ 'rgba(255, 255, 255, 0.95)' }
                    inactiveDotColor={ 'rgba(255,255,255,0.75)' }
                    activeDotIndex={ this.state.currentIndex } dotsLength={ this.projects.length }/>
                  }
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
    defaultProjects: state.search.defaults.projects,
    projects: state.search.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showError: mes =>dispatch(globalActions.showAlertError(mes))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPage)
