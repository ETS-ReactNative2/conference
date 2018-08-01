import { Body, Button, Col, Container, Grid, Header, Icon, Left, List, ListItem, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import {connect} from 'react-redux'
import * as searchActions from '../../../../search/actions'
import Filters from './filters'

class InvestorsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilters: false,
      defaults: {}
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
    }, () => {
      this.props.updateInvestors(newDefaults)
    })
  }

  render () {
    const { showFilters, defaults } = this.state

    return (
      <Container style={ { flex: 1 } }>
        <ScrollView>
          <Header>
            <Left>
              <Text>Investors</Text>
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
            <Grid style={ { alignItems: 'center', justifyContent: 'center' } }>
              <Col>
                <Text>No profiles found. Try to change filters</Text>
              </Col>
            </Grid>
          ) }
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <InvestorItem key={ profile.id } investor={ profile } onMark={ () => {}} onClick={() => this.props.onClick(profile)}/>
              )
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}

function InvestorItem ({ investor, onMark, onClick }) {
  return (
    <ListItem onPress={ onClick }>
      <Body>
      <Text>{ investor.name } - { investor.tagline }</Text>
      <Text note>{ investor.description }</Text>
      <Text>{ JSON.stringify(investor, null, 2) }</Text>
      </Body>
      <Right>
        <Button transparent disabled={investor.marked} onPress={ onMark }>
          <Icon active={ investor.marked } color={ 'yellow' } name={ 'star' }/>
        </Button>
      </Right>
    </ListItem>
  )
}

InvestorsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateInvestors: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.investors
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateInvestors: filters => dispatch(searchActions.updateInvestors(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorsList)
