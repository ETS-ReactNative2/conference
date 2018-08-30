import { Container, Text } from 'native-base'
import React, { Component } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { SafeAreaView } from 'react-navigation'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/logo-white.png'
import { getDimensions } from '../../../common/dimension-utils'
import { NavigationHeader } from '../../components/header/header'
import { JobCard } from './components/job-card'

export default class JobsPage extends Component {
  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange)
  }

  _renderItem = ({ item: job, index }) => <JobCard key={ index } job={ job } navigation={ this.props.navigation }/>
  
  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
  }

  handleDimensionsChange = () => {
    this.forceUpdate()
  }

  render () {
    const { itemWidth, sliderWidth } = getDimensions()
    const project = this.props.navigation.getParam('project');
    const jobs = project.jobListings;

    return (
      <SafeAreaView style={ styles.container } forceInset={ { top: 'always' } }>
        <Container style={ styles.container }>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <NavigationHeader
                onBack={ () => this.props.navigation.goBack() }
                title={ `${I18n.t(`project_page.jobs_title`)} ${project.name}` }
                titleStyle={ styles.navigationStyle }
                rightIconSource={ WhiteLogo }/>
              <View style={ { marginTop: 64 } }>
                  <React.Fragment>
                    <Carousel
                      ref={ (c) => { this._carousel = c } }
                      data={ jobs }
                      renderItem={ this._renderItem }
                      sliderWidth={ sliderWidth }
                      itemWidth={ itemWidth }
                    />
                    { jobs.length < 8 &&
                    <Pagination
                      dotColor={ 'rgba(255, 255, 255, 0.95)' }
                      inactiveDotColor={ 'rgba(255,255,255,0.75)' }
                      dotsLength={ jobs.length }/>
                    }
                  </React.Fragment>
              </View>
            </ScrollView>
          </View>
        </Container>
      </SafeAreaView>
    )
  }
}
const styles = EStyleSheet.create({
  navigationStyle: {
    color: '#fff',
    marginTop: 12
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    paddingTop: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#172D5C'
  }
})