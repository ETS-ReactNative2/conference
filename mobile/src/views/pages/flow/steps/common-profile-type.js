import { Container, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import EStyleSheet from 'react-native-extended-stylesheet'
import { Header } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import { signUpActions } from '../../../../signup'
import { FlowButton } from '../../../design/buttons'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { EmployeeRole, InvesteeProjectSetup, InvestorCompanyLocation } from './index'


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

  static BACKGROUND_COLOR = 'green'

  constructor (props) {
    super(props)
    this.state = {
      selectedValue: this.props.profileType,
      selected: options.findIndex(singleOption => singleOption.value === this.props.profileType)
    }
  }

  render () {
    return (
      <Container style={ styles.container }>
        <StepTitle text={ I18n.t('flow_page.common.profile_type.title') }/>
        <View style={ { flex: 1, justifyContent: 'center' } }>
          {
            options.map((option, index) => {
              return (
                <FlowListItem
                  key={ option.slug }
                  multiple={ false }
                  text={ I18n.t(`flow_page.common.profile_type.${option.slug}`) }
                  selected={ this.state.selected === index }
                  onSelect={ () => this.handleChange(index) }
                />
              )
            })
          }
        </View>
        <View style={ { margin: 8 } }>
          <FlowButton
            text={ I18n.t('common.next') }
            disabled={ this.state.selected === -1 }
            onPress={ this.handleSubmit }
          />
        </View>
      </Container>
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
    this.props.saveProfileInfo({ type: this.state.selectedValue })
    this.props.onFill({ nextStep })
  }

  handleChange = (index) => {
    this.setState({
      selected: index,
      selectedValue: options[ index ].value
    })
  }
}

const styles = EStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: `100% - ${Header.HEIGHT}`
  }
})

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
    saveProfileInfo: profileInfo => dispatch(signUpActions.saveProfileInfo(profileInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommonProfileType)
