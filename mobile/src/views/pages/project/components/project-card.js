import { Icon, Text } from 'native-base'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../../locales/i18n'
import { itemWidth } from '../../../../common/dimension-utils'
import ColorLogo from '../../../../assets/logos/conference_logo_welcome_medium.png'
import { FUNDING_STAGES, GIVEAWAY_TYPES_PROJECT, INVESTOR_INDUSTRIES, PRODUCT_STAGES } from '../../../../enums'
import { PAGES_NAMES } from '../../../../navigation/pages'

export class ProjectCard extends React.Component {

  shouldComponentUpdate = () => {
    return false
  }

  handleDescription = () => {
    const { project } = this.props
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_DESCRIPTION_PAGE, { project })
  }

  handleHiring = () => {
    const { project } = this.props
    this.props.navigation.navigate(PAGES_NAMES.JOBS_PAGE, { project })
  }

  goToUrl = uri => {
    this.props.navigation.navigate(PAGES_NAMES.WEBVIEW_PAGE, { uri })
  }

  render () {
    const { project } = this.props

    const {
      fundraisingAmount, giveaway, fundingStage, productStage, industry, size, imageUrl,
      notable, description, jobListings, github, telegram, twitter, linkein, website, whitepaper, news
    } = project
    const avatar = imageUrl
      ? {uri: `${imageUrl}?w=200&h=200`}
      : ColorLogo
    const raising = fundraisingAmount ? fundraisingAmount : 0
    const giveAwayLabel = giveaway ? I18n.t(`common.giveaway.${GIVEAWAY_TYPES_PROJECT.find(item => item.index === giveaway).slug}`) : ''
    const fundingStageLabel = fundingStage ? I18n.t(`common.funding_stages.${FUNDING_STAGES.find(item => item.index === fundingStage).slug}`) : ''
    const productStageLabel = productStage ? I18n.t(`common.product_stages.${PRODUCT_STAGES.find(item => item.index === productStage).slug}`) : ''
    const industryLabel = industry ? I18n.t(`common.industries.${INVESTOR_INDUSTRIES.find(item => item.index === industry).slug}`) : ''
    const notables = notable.split(' ')

    return (
      <View style={ {
        borderRadius: 8,
        backgroundColor: 'white',
        padding: 8,
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center'
      } }>
        <View style={ { flexDirection: 'row' } }>
          <View style={ {
            alignItems: 'center',
            minWidth: 100,
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 30
          } }>
            { whitepaper ? (
              <Icon style={ styles.linkButton } type='Ionicons' name='ios-paper'
                    onPress={ () => this.goToUrl(whitepaper) }/>
            ) : null }
            { website ? (
              <Icon style={ styles.linkButton } type='MaterialCommunityIcons' name='web'
                    onPress={ () => this.goToUrl(website) }/>
            ) : null }
            { news ? (
              <Icon style={ styles.linkButton } type='Entypo' name='new' onPress={ () => this.goToUrl(news) }/>
            ) : null }
          </View>
          <Image style={ styles.portrait } source={ avatar }/>
          <View style={ {
            alignItems: 'center',
            minWidth: 100,
            justifyContent: 'center',
            paddingTop: 10,
            paddingBottom: 30
          } }>

            { telegram ? (
              <Icon style={ styles.linkButton } type='MaterialCommunityIcons' name='telegram'
                    onPress={ () => this.goToUrl(telegram) }/>
            ) : null }
            { github ? (
              <Icon style={ styles.linkButton } name='logo-github' onPress={ () => this.goToUrl(github) }/>
            ) : null }
            { linkein ? (
              <Icon style={ styles.linkButton } type='Entypo' name='linkedin' onPress={ () => this.goToUrl(linkein) }/>
            ) : null }
          </View>
        </View>
        <View style={ {
          marginTop: 16,
          marginBottom: 16,
          marginLeft: 16,
          marginRight: 16,
          justifyContent: 'center',
          alignItems: 'center'
        } }>
          <Text style={ styles.largeText }>{ `${project.name} ` }</Text>
          <Text style={ styles.normalText }>{ project.tagline }</Text>
          <View style={ {
            marginTop: 16,
            marginLeft: 32,
            marginRight: 32,
            // width: (itemWidth - 2 * 32),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between'
          } }>
            <Flag style={ styles.countryFlag } code={ project.legalCountry }/>
            <Flag style={ styles.countryFlag } code={ project.mainCountry }/>
          </View>

          <View style={ {
            justifyContent: 'space-around',
            flexDirection: 'row',
            marginTop: 32,
            marginLeft: 16,
            marginRight: 16,
            width: (itemWidth - 2 * 16)
          } }>
            <View style={ { alignContent: 'space-between' } }>
              <Text style={ styles.smallText }>{ raising ? `Raising $${raising}` : null }</Text>
              <Text style={ styles.smallText }>{ giveAwayLabel }</Text>
              <Text style={ styles.smallText }>{ fundingStageLabel }</Text>
            </View>
            <View style={ { alignContent: 'space-between' } }>
              <Text style={ styles.smallText }>{ productStageLabel }</Text>
              <Text style={ styles.smallText }>{ industryLabel }</Text>
              <Text style={ styles.smallText }>{ size ? `Team: ${size}` : '' }</Text>
            </View>
            <View style={ { alignContent: 'space-between' } }>
              {
                notables.map((item, index) => <Text key={index} style={styles.smallText}>{ item }</Text>)
              }
            </View>
          </View>

          <View style={ {
            marginTop: 32,
            marginLeft: 16,
            marginRight: 16,
            width: (itemWidth - 2 * 16),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'space-between'
          } }>
            <View>
              { description ? (
                <Text onPress={ this.handleDescription } style={ [ styles.smallActionText,
                  styles.underline ] }>{ I18n.t('project_page.description') }</Text>
              ) : null }
            </View>
            <View>
              { (jobListings && jobListings.length > 0) ? (
                <Text onPress={ this.handleHiring } style={ [ styles.smallActionText, styles.underline ] }>{ I18n.t(
                  'project_page.hiring') }</Text>
              ) : null }
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    marginLeft: 16
  },
  linkButton: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    alignContent: 'space-between'
  },
  content: {
    flex: 1,
    backgroundColor: '#2C65E2'
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
  infoHeader: {
    fontWeight: 'bold',
    marginBottom: 16,
    fontSize: 12
  },
  smallText: {
    fontSize: 12,
    color: '#000'
  },
  smallActionText: {
    fontSize: 12,
    color: '#888'
  },
  headerTitle: {
    textAlign: 'center',
    flexGrow: 1,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Montserrat-SemiBold'
  },
  listItem: {
    flexDirection: 'column',
    width: 300,
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 7,
    backgroundColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  portrait: {
    width: 100,
    height: 100,
    marginTop: 8,
    borderRadius: 8
  },
  countryFlag: {
    width: 60,
    height: 45,
    marginTop: 16
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
    marginLeft: 16,
    marginRight: 18
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    fontSize: 11,
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginRight: 18,
    marginBottom: 11
  },
  normalText: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    textAlign: 'center'
  },
  largeText: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    textAlign: 'center',
    marginBottom: 4
  },
  underline: {
    textDecorationLine: 'underline'
  },
  comment: {
    width: '100%',
    fontSize: 12,
    fontFamily: 'Helvetica',
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  },
  footerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
})
