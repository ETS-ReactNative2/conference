import { Button, Container, List, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../../locales/i18n'
import { PAGES_NAMES } from '../../../../navigation'
import Job from '../../../components/professional/job-cards'

class JobList extends React.Component {

  handleClickFilter = () => {
    this.props.navigation.navigate(PAGES_NAMES.JOB_MAIN_FILTER_PAGE);
  }

  render () {
    const { jobs } = this.props
    return (
      <Container style={ { flex: 1 } }>
        <ScrollView style={ styles.scrollView }>
          <View style={ styles.headerContainer }>
            { this.props.jobs.length === 0 &&
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
              jobs.length > 0 &&
              jobs.map(job =>
                <Job.Medium key={ job.id } job={ job }
                         onLink={ () => this.props.navigation.navigate(PAGES_NAMES.WEBVIEW_PAGE, { uri: job.link }) }
                         onClick={ () => this.props.navigation.navigate(PAGES_NAMES.JOBS_PAGE, { project: { jobListings: jobs }, job }) }/>
              )
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
  jobContainer: {
    padding: 8,
    justifyContent: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: 8
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
    color: '#fff'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

JobList.propTypes = {
  jobs: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default JobList
