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
  constructor(props) {
    super(props);

    const project = props.navigation.getParam('project');
    const job = props.navigation.getParam('job');
    const jobs = project.jobListings;

    this.state = {
      currentIndex: job ? jobs.findIndex(jobItem => jobItem.id === job.id) : 0
    }
  }

  componentDidMount() {
    Dimensions.addEventListener('change', this.handleDimensionsChange)
  }

  _renderItem = ({ item: job, index }) => <JobCard key={`job_card_${index}`} job={ job } navigation={ this.props.navigation }/>

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
    const { currentIndex } = this.state

    return (
      <SafeAreaView style={ styles.container } forceInset={ { top: 'always' } }>
        <Container style={ styles.container }>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <NavigationHeader
                onBack={ () => this.props.navigation.goBack() }
                title={ project.name ? `${I18n.t(`project_page.jobs_title`)} ${project.name}` : I18n.t(`search_page.tab_label_job`) }
                titleStyle={ styles.navigationStyle }
                rightIconSource={ WhiteLogo }/>
              <View style={{ marginTop: 64 }}>
                  <React.Fragment>
                    <Carousel
                      ref={(c) => { this._carousel = c }}
                      data={jobs}
                      keyExtractor={item => String(item.id)}
                      initialNumToRender={30}
                      renderItem={this._renderItem}
                      sliderWidth={sliderWidth}
                      itemWidth={itemWidth}
                      firstItem={currentIndex}
                      onBeforeSnapToItem={index => this.setState({ currentIndex: index })}
                    />
                    {jobs.length < 8 &&
                      <Pagination
                        dotColor={ 'rgba(255, 255, 255, 0.95)' }
                        inactiveDotColor={ 'rgba(255,255,255,0.75)' }
                        dotsLength={ jobs.length }
                        activeDotIndex={currentIndex}
                      />
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
