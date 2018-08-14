import { Button, Card, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { TOKEN_TYPES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvesteeProductStage } from './index'

class InvesteeTokenType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tokenType: this.props.tokenType
    }

    this.state.isFormValid = this.isFormValid()
  }

  handleSubmit = () => {
    this.props.saveInvestee({ tokenType: this.state.tokenType })
    this.props.onFill({ nextStep: InvesteeProductStage })
  }

  handleChange = (index) => {
    this.setState({
      tokenType: index
    }, this.validateForm)
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.token_type.title') }</Text>
        { TOKEN_TYPES.map(( {slug, index}) => {
          return (
            <ListItem
              onPress={ () => this.handleChange(index) }
              key={ `investment-item-${slug}` }>
              <Left>
                <Text>{ I18n.t(`common.token_types.${slug}`) }</Text>
              </Left>
              <Right>
                <Radio
                  onPress={ () => this.handleChange(index) }
                  selected={ this.state.tokenType === index }/>
              </Right>
            </ListItem>
          )
        }) }
        <Button success
                rounded
                block
                disabled={ !this.state.isFormValid }
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  isFormValid = () => {
    return this.state.tokenType !== -1
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }
}

InvesteeTokenType.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    tokenType: state.signUp.investee.tokenType
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveInvestee: investeeData => dispatch(signUpActions.saveProfileInvestee(investeeData))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvesteeTokenType)
