import { Body, Col, Container, Grid, List, ListItem, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'

class InvestorsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    return (
      <Container style={ { flex: 1, padding: 10 } }>
        { this.props.profiles.length === 0 && (
          <Grid style={ { alignItems: 'center' } }>
            <Col>
              <Text>No profiles found. Try to change filters</Text>
            </Col>
          </Grid>
        ) }
        <ScrollView>
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <InvestorItem key={ profile.id } investor={ profile }/>
              )
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}

function InvestorItem ({ investor }) {
  return (
    <ListItem>
      <Body>
      <Text>{ investor.name } - { investor.tagline }</Text>
      <Text note>{ investor.description }</Text>
      <Text>{ JSON.stringify(investor, null, 2) }</Text>
      </Body>
    </ListItem>
  )
}

InvestorsList.propTypes = {
  profiles: PropTypes.array.isRequired
}

export default InvestorsList
