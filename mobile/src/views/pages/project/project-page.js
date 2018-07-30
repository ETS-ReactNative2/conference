import { Text } from 'native-base'
import React, { Component } from 'react'

class ProjectPage extends Component {
  render () {
    const project = this.props.navigation.getParam('project', {})
    return (
      <Text>{ JSON.stringify(project, null, 2) }</Text>
    )
  }
}

export default ProjectPage
