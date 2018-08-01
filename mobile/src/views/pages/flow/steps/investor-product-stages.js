import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { PRODUCT_STAGES } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import { InvestorMarketLocation } from './index'


class InvestorProductStages extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      productStages: this.props.investor.productStages
    }
    this.state.isFormValid = this.isFormValid()
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.investor.product_stage.title') }</Text>
        <Content>
          {
            PRODUCT_STAGES.map((option) => {
              return (
                <ListItem style={ { width: '100%' } } key={ option.slug } onPress={ () => this.handleChange(option.index) }>
                  <Left>
                    <Text>{ I18n.t(`common.product_stages.${option.slug}`) }</Text>
                  </Left>
                  <Right>
                    <Radio
                      onPress={ () => this.handleChange(option.index) }
                      selected={ this.state.productStages.indexOf(option.index) !== -1 }/>
                  </Right>
                </ListItem>
              )
            })
          }
        </Content>
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
    return this.state.productStages.length > 0;
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  handleSubmit = () => {
    this.props.save({
      productStages: this.state.productStages
    })
    this.props.onFill({
      nextStep: InvestorMarketLocation
    })
  }

  handleChange = (index) => {
    const selectedProductStagesCopy = [...this.state.productStages]
    const clickedItemIndex = selectedProductStagesCopy.indexOf(index);
    if (clickedItemIndex === -1) {
      selectedProductStagesCopy.push(index);
    } else {
      selectedProductStagesCopy.splice(clickedItemIndex, 1);
    }
    this.setState({
      productStages: selectedProductStagesCopy
    }, this.validateForm)
  }
}

InvestorProductStages.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    investor: state.signUp.investor
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: investorInfo => dispatch(signUpActions.saveInvestor(investorInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvestorProductStages)
