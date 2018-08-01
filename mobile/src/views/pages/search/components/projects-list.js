import { Body, Button, Col, Container, Grid, Header, Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import {connect} from 'react-redux'
import * as searchActions from '../../../../search/actions'
import Filters from './filters'

class ProjectsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilters: false,
      defaults: {
      }
    }
  }

  handleShowFilter = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  handleSearch = newDefaults => {
    this.setState({
      showFilters: false,
      defaults: {
        ...this.state.defaults,
        ...newDefaults
      }
    }, () => this.props.updateProjects(newDefaults))
  }

  render () {
    const { showFilters, defaults } = this.state

    return (
      <Container style={ { flex: 1 } }>
        <ScrollView>
          <Header>
            <Left>
              <Text>Projects</Text>
            </Left>
            <Right>
              <Button
                transparent
                dark={ !showFilters }
                info={ showFilters }
                iconLeft
                onPress={ this.handleShowFilter }>
                <Icon active name={ 'cog' }/>
                <Text>Filters</Text>
              </Button>
            </Right>
          </Header>
          { showFilters && (
            <Filters defaults={ defaults } onSearch={ this.handleSearch }/>
          ) }
          { this.props.profiles.length === 0 && (
            <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center' } }>
                <Text style={{ fontWeight: 'bold'}}>No projects found. Try to change filters</Text>
            </View>
          ) }
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <ProjectItem key={ profile.id } project={ profile } onMark={ () => {}} onClick={() => this.props.onClick(profile)}/>
              )
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}

function ProjectItem ({ project, onMark, onClick }) {
  return (
    <ListItem onPress={ onClick }>
      <Body>
      <Text>{ project.name } - { project.tagline }</Text>
      <Text note>{ project.description }</Text>
      <Text>{ JSON.stringify(project, null, 2) }</Text>
      </Body>
      <Right>
        <Button transparent disabled={project.marked} onPress={ onMark }>
          <Icon active={ project.marked } color={ 'yellow' } name={ 'star' }/>
        </Button>
      </Right>
    </ListItem>
  )
}

ProjectsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.investors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProjects: filters => dispatch(searchActions.updateProjects(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
