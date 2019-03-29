import { Button, Container, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { FlatList } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../../locales/i18n'
import { PAGES_NAMES } from '../../../../navigation'
import Project from '../../../components/project/project-cards'

class ProjectsList extends React.Component {

  handleClickFilter = () => {
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_MAIN_FILTER_PAGE)
  }

  render () {
    const { profiles: projects, filters, updateProjects } = this.props

    return (
      <Container style={ { flex: 1 } }>
        <FlatList
          onRefresh={ () => updateProjects(filters) }
          refreshing={ false }
          ListHeaderComponent={
            <View style={ styles.headerContainer }>
              { projects.length === 0 &&
              <Text style={ styles.comment }>{ I18n.t('search_page.no_profile') }</Text> }
              <Button
                transparent
                style={ styles.fullWidth }
                onPress={ this.handleClickFilter }>
                <Text style={ [ styles.underline, styles.centerText, styles.largeText, styles.fullWidth ] }>{ I18n.t(
                  'search_page.update_filter') }</Text>
              </Button>
            </View>
          }
          style={ styles.scrollView }
          data={ projects }
          keyExtractor={ item => item.id }
          renderItem={ ({ item }) => (
            <Project.Medium key={ item.id } project={ item }
                            onClick={ () => this.props.onClick(item) }/>
          ) }
        />
      </Container>
    )
  }
}

const styles = EStyleSheet.create({
  centerText: {
    textAlign: 'center'
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

ProjectsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
}

export default ProjectsList
