import { Body, Col, Container, Grid, List, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'

class ProjectsList extends React.Component {
  render () {
    return (
      <Container style={ { flex: 1, padding: 10 } }>
        { this.props.profiles.length === 0 &&
        <Grid style={ { alignItems: 'center' } }>
          <Col>
            <Text>No projects found. Try to change filters</Text>
          </Col>
        </Grid>
        }
        <ScrollView>
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <ProjectItem key={ profile.id } project={ profile }/>
              )
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}

function ProjectItem ({ project }) {
  return (
    <ListItem>
      <Body>
      <Text>{ project.name } - { project.tagline }</Text>
      <Text note>{ project.description }</Text>
      <Text>{ JSON.stringify(project, null, 2) }</Text>
      </Body>
    </ListItem>
  )
}

ProjectsList.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default ProjectsList
