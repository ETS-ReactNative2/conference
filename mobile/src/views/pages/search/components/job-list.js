import { Button, Container, Left, List, ListItem, Right, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { ROLES } from '../../../../enums'
import { PAGES_NAMES } from '../../../../navigation'
import * as searchActions from '../../../../search/actions'

class JobList extends React.Component {
  state = {
    defaults: {}
  }

  componentWillReceiveProps (nextProps) {
    const { filters, updateJobs } = this.props

    if (filters !== nextProps.filters) {
      updateJobs(nextProps.filters)
    }
  }

  handleClickFilter = () => {
    this.props.navigation.navigate(PAGES_NAMES.JOB_MAIN_FILTER_PAGE);
  }

  render () {
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
              this.props.jobs.length > 0 &&
              this.props.jobs.map(job =>
                <JobItem key={ job.id } job={ job }
                         onLink={ () => this.props.navigation.navigate(PAGES_NAMES.WEBVIEW_PAGE, { uri: job.link }) }
                         onMark={ () => {} }
                         onClick={ () => this.props.onClick(job) }/>
              )
            }
          </List>
          <View style={ { height: 190, width: '100%' } }/>
        </ScrollView>
      </Container>
    )
  }
}

const JobItem = ({ job, onClick, onLink }) => {
  const { project, country, city, description, link, partTime, localRemoteOptions, payments, role, skillsText } = job
  return (
    <ListItem thumbnail onPress={ onClick } style={ styles.listItem }>
      <Left>
        <View style={ styles.flagContainer }>
          <Flag style={ styles.countryFlag } code={ country }/>
        </View>
      </Left>
      <Right>
        <View style={ styles.jobContainer }>
          <Text
            style={ styles.largeText }>{ I18n.t(`common.roles.${ROLES.find(r => r.index === role).slug}`) + ` - ${project ? project.name : 'Anonymous project'}` }</Text>
          { skillsText.length > 0 && <Text style={ styles.normalText }>{ skillsText }</Text> }
          <Text
            style={ styles.normalText }>{ partTime ? I18n.t('job_item.part_time') : I18n.t('job_item.full_time') }</Text>
          <View style={ { flexDirection: 'row' } }>
            { localRemoteOptions.findIndex(op => op === 1) !== -1 &&
            <Text style={ styles.normalText }>{ `${country}, ${city}` }</Text>
            }
            {
              localRemoteOptions.length === 2 &&
              <Text style={ styles.normalText }> / </Text>
            }
            {
              localRemoteOptions.findIndex(op => op === 2) !== -1 &&
              <Text style={ styles.normalText }>{ I18n.t('common.job_location.remote') }</Text>
            }
          </View>
          <Text style={ styles.normalText }>{ description }</Text>
        </View>
      </Right>
    </ListItem>
  )
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
  listItem: {
    height: 100,
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
    shadowRadius: 3,
    overflow: 'hidden'
  },
  portrait: {
    width: 97,
    height: 100
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 18
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginRight: 18,
    marginBottom: 11
  },
  normalText: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    textAlign: 'left'
  },
  countryFlag: {
    width: 30,
    height: 40,
    padding: 0
  },
  flagContainer: {
    padding: 8,
    justifyContent: 'center',
    alignContent: 'center'
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
  onClick: PropTypes.func.isRequired,
  updateJobs: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    jobs: state.search.jobs,
    filters: state.filter.job
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateJobs: filters => dispatch(searchActions.updateJobs(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(JobList)
