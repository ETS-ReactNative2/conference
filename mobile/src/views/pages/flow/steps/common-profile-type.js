import { View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { ImageBackground, ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'
import { connect } from 'react-redux'
import I18n from '../../../../../locales/i18n'
import WelcomePageBackgroundImage from '../../../../assets/images/welcome_screen_background.png'
import WhiteLogo from '../../../../assets/logos/logo-white.png'
import { PAGES_NAMES } from '../../../../navigation'
import { signUpActions } from '../../../../signup'
import Header from '../../../components/header/header'
import { BlackButton } from '../../../design/buttons'
import { FlowListItem } from '../../../design/list-items'
import { StepTitle } from '../../../design/step-title'
import { EmployeeRole, InvesteeProjectSetup, InvestorCompanyLocation } from './index'

const options = [
  {
    slug: 'meeting',
    value: 'employee'
  },
  {
    slug: 'projects',
    value: 'investor'
  },
  {
    slug: 'meeting_investors',
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
      <SafeAreaView style={ { flex: 1, backgroundColor: '#000000' } } forceInset={ { top: 'always' } }>
        <ImageBackground source={ WelcomePageBackgroundImage } style={ styles.imageContainer } blurRadius={ 1 }>
          <LinearGradient style={ { flex: 1 } } locations={ [ 0, 0.4, 0.8 ] }
                          colors={ [ 'rgba(0, 0, 0, 1)', 'rgba(255, 0, 92 ,0.8)', 'rgba(156, 26, 73, 0.7)' ] }>
            <View style={ styles.content }>
              <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
                <Header title={ I18n.t('flow_page.common.profile_onboarding.header') }
                        rightIconSource={ WhiteLogo }
                        titleStyle={ styles.headerTitle }/>
                <View style={ styles.pageTitleContainer }>
                  <StepTitle text={ I18n.t('flow_page.common.profile_type.title') }
                             textStyle={ styles.pageTitle }/>
                </View>
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
              </ScrollView>
              <View style={ { margin: 8 } }>
                <BlackButton
                  text={ I18n.t('common.next') }
                  disabled={ this.state.selected === -1 }
                  onPress={ this.handleSubmit }
                />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
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
    this.props.navigation.navigate(PAGES_NAMES.FLOW_PAGE)
  }

  handleChange = (index) => {
    this.setState({
      selected: index,
      selectedValue: options[ index ].value
    })
  }
}

const styles = EStyleSheet.create({
  imageContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'transparent'
  },
  content: {
    flex: 1
  },
  pageTitleContainer: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  },
  headerTitle: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  }
})

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
