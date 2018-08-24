import I18n from '../../../../../locales/i18n'
import { Body, Button, Col, Container, Grid, Header, Icon, Left, List, ListItem, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ScrollView } from 'react-native'
import {connect} from 'react-redux'
import * as searchActions from '../../../../search/actions'

class ProfessionalsList extends React.Component {
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
      this.props.updateProfessionals(newDefaults)
    })
  }

  render () {
    const { showFilters, defaults } = this.state

    return (
      <Container style={ { flex: 1 } }>
        <ScrollView>
          <Header>
            <Left>
              <Text>{ I18n.t('search_page.professional_header') }</Text>
            </Left>
            <Right>
              <Button
                transparent
                dark={ !showFilters }
                info={ showFilters }
                iconLeft
                onPress={ this.handleShowFilter }>
                <Icon active name={ 'cog' }/>
                <Text>{ I18n.t('search_page.filters') }</Text>
              </Button>
            </Right>
          </Header>
          { this.props.profiles.length === 0 && (
            <Grid style={ { alignItems: 'center', justifyContent: 'center' } }>
              <Col>
                <Text>{ I18n.t('search_page.no_profile') }</Text>
              </Col>
            </Grid>
          ) }
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <ProfessionalItem key={ profile.id } professional={ profile } onMark={ () => {}} onClick={() => this.props.onClick(profile)}/>
              )
            }
          </List>
        </ScrollView>
      </Container>
    )
  }
}

function ProfessionalItem ({ professional, onMark, onClick }) {
  return (
    <ListItem onPress={ onClick }>
      <Body>
      <Text>TODO</Text>
      <Text note>TODO</Text>
      <Text>{ JSON.stringify(professional, null, 2) }</Text>
      </Body>
      <Right>
        <Button transparent disabled={professional.marked} onPress={ onMark }>
          <Icon active={ professional.marked } color={ 'yellow' } name={ 'star' }/>
        </Button>
      </Right>
    </ListItem>
  )
}

ProfessionalsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateProfessionals: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.professionals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfessionals: filters => dispatch(searchActions.updateProfessionals(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalsList)
