import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../../locales/i18n'
import WhiteLogo from '../../../../assets/logos/ico_white.png'
import { PAGES_NAMES } from '../../../../navigation/index'
import Header from '../../../components/header/header'
import { PrimaryButton } from '../../../design/buttons'
import { ImagePageContainer } from '../../../design/image-page-container'
import { StepTitle } from '../../../design/step-title'

class CommonFlowFinishedPage extends React.Component {

  goToHomePage = () => {
    console.log(this.props);
    this.props.navigation.navigate(PAGES_NAMES.HOME_PAGE)
  }

  render () {
    return (
      <ImagePageContainer>
        <View style={ styles.content }>
          <ScrollView contentContainerStyle={ { flexGrow: 1 } }>
            <Header
              title={ this.props.headerTitle }
              rightIconSource={ WhiteLogo }/>
            <View style={ styles.pageTitleContainer }>
              <StepTitle
                text={ this.props.description }
                textStyle={ styles.pageTitle }
              />
            </View>
          </ScrollView>
        </View>
        <View style={ { margin: 8 } }>
          <PrimaryButton
            text={ I18n.t('common.home_page') }
            onPress={ this.goToHomePage }
          />
        </View>
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  content: {
    flex: 1
  },
  pageTitleContainer: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
    letterSpacing: 0.18,
    lineHeight: 30
  }
})

CommonFlowFinishedPage.propTypes = {
  headerTitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export const ProjectFlowFinishedPage = (props) => (<CommonFlowFinishedPage headerTitle={ I18n.t('flow_page.investee.flow_finished.header') }
                                                        description={ I18n.t('flow_page.investee.flow_finished.text') } {...props}/>)
export const InvestorFlowFinishedPage = (props) => (<CommonFlowFinishedPage headerTitle={ I18n.t('flow_page.investor.flow_finished.header') }
                                                         description={ I18n.t('flow_page.investor.flow_finished.text') } {...props} />)

