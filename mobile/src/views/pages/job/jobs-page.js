import React, { Component } from 'react'
import { Dimensions, ScrollView, View } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import { getDimensions } from '../../../common/dimension-utils'
import { NavigationHeader } from '../../components/header/header'
import Job from '../../components/professional/job-cards'
import { ImagePageContainer } from '../../design/image-page-container'

export default class JobsPage extends Component {
  constructor (props) {
    super(props)

    const project = props.navigation.getParam('project')
    const job = props.navigation.getParam('job')
    const jobs = project.jobListings

    this.state = {
      currentIndex: job ? jobs.findIndex(jobItem => jobItem.id === job.id) : 0
    }
  }

  componentDidMount () {
    Dimensions.addEventListener('change', this.handleDimensionsChange)
  }

  _renderItem = ({ item: job, index }) => <Job.XL key={ `job_card_${index}` } job={ job }
                                                  navigation={ this.props.navigation }/>

  componentWillUnmount () {
    Dimensions.removeEventListener('change', this.handleDimensionsChange)
  }

  handleDimensionsChange = () => {
    this.forceUpdate()
  }

  render () {
    const { itemWidth, sliderWidth } = getDimensions()
    const project = this.props.navigation.getParam('project')
    const jobs = project.jobListings.map(jb => {
      const { id, imageUrl, name } = project
      console.log({jb, id, imageUrl, name})
      return {
        ...jb,
        project: {
          ...jb.project,
          id: id !== undefined ? id :  jb.project.id,
          imageUrl: imageUrl !== undefined ? imageUrl : jb.project.imageUrl,
          name: name !== undefined ? name : jb.project.name
        }
      }
    })
    const { currentIndex } = this.state

    return (
      <ImagePageContainer>
        <ScrollView>
          <NavigationHeader
            onBack={ () => this.props.navigation.goBack() }
            title={ project.name ? `${I18n.t(`project_page.jobs_title`)} ${project.name}` : I18n.t(`search_page.tab_label_job`) }
            rightIconSource={ WhiteLogo }/>
          <View style={ { marginTop: 64 } }>
            <React.Fragment>
              <Carousel
                ref={ (c) => { this._carousel = c } }
                data={ jobs }
                keyExtractor={ item => String(item.id) }
                initialNumToRender={ 30 }
                renderItem={ this._renderItem }
                sliderWidth={ sliderWidth }
                itemWidth={ itemWidth }
                firstItem={ currentIndex }
                onBeforeSnapToItem={ index => this.setState({ currentIndex: index }) }
              />
              { jobs.length < 8 &&
                <Pagination
                  dotColor={ 'rgba(255, 255, 255, 0.95)' }
                  inactiveDotColor={ 'rgba(255,255,255,0.75)' }
                  dotsLength={ jobs.length }
                  activeDotIndex={ currentIndex }
                />
              }
            </React.Fragment>
          </View>
        </ScrollView>
      </ImagePageContainer>
    )
  }
}
