import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { EmployeeRole, InvesteeProjectSetup, InvestorCompanyLocation } from './index'
import { signUpActions } from '../../../../signup'

const options = [
  {
    slug: 'meeting',
    value: 'attendant'
  },
  {
    slug: 'projects',
    value: 'investor'
  },
  {
    slug: 'metting_investors',
    value: 'investee'
  }
]

class CommonProfileType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selectedValue: this.props.profileType,
      selected: options.findIndex(singleOption => singleOption.value === this.props.profileType)
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.common.profile_type.title') }</Text>
        <Content>
          {
            options.map((option, index) => {
              return (
                <ListItem style={ { width: '100%' } } key={ option.slug } onPress={ () => this.handleChange(index) }>
                  <Left>
                    <Text>{ I18n.t(`flow_page.common.profile_type.${option.slug}`) }</Text>
                  </Left>
                  <Right>
                    <Radio
                      onPress={ () => this.handleChange(index) }
                      selected={ this.state.selected === index }/>
                  </Right>
                </ListItem>
              )
            })
          }
        </Content>
        <Button success
                rounded
                block
                disabled={ this.state.selected === -1}
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleSubmit = () => {
    let nextStep
    switch (this.state.selected) {
      case 0:
        nextStep = EmployeeRole
        break
      case 1:
        nextStep = InvestorCompanyLocation
        break
      case 2:
        nextStep = InvesteeProjectSetup
        break
    }
    this.props.saveProfileInfo({ type: this.state.selectedValue });
    this.props.onFill({ nextStep })
  }

  handleChange = (index) => {
    this.setState({
      selected: index,
      selectedValue: options[ index ].value
    })
  }
}

CommonProfileType.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profileType: state.signUp.profile.type
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveProfileInfo : profileInfo => dispatch(signUpActions.saveProfileInfo(profileInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonProfileType)
