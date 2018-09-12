import { Icon, Text, Button, Item } from 'native-base'
import React from 'react'
import { Image, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import I18n from '../../../../../locales/i18n'
import Flag from 'react-native-flags'
import { itemWidth } from '../../../../common/dimension-utils'
import { ROLES, JOB_LOCATION, PAYMENTS } from '../../../../enums'
import { PAGES_NAMES } from '../../../../navigation/pages'

export class JobCard extends React.Component {
  shouldComponentUpdate = () => {
    return false
  }

  handleOnDescription = (description) => {
    this.props.navigation.navigate(PAGES_NAMES.JOB_DESCRIPTION_PAGE, {description});
  }

  handleLink = (url) => {
    this.props.navigation.navigate(PAGES_NAMES.WEBVIEW_PAGE, {url});
  }

  render () {
    const { job } = this.props;
    const { role, skillsText, localRemoteOptions, country, city, partTime, payments, description, link } = job;

    return (
      <View style={styles.cardStyle}>
        <View style = {styles.headerContainer}>
          <Text style={styles.largeText}>
            {I18n.t(`common.roles.${ROLES.find(item => item.index === role).slug}`)}
          </Text>
          <Text style={styles.mediumText}>
            {skillsText}
          </Text>
        </View>
        <View style = {styles.localOrRemote}>
          {
            localRemoteOptions.map((indexItem, index) => {
              return(
                <Text key={index} style={styles.smallText}>{I18n.t(`common.job_location.${JOB_LOCATION.find(location => location.index===indexItem).slug}`)}</Text>
              )
            })
          }
        </View>
        <View style = {styles.country}>
          {country ? (
            <Flag style={styles.countryFlag} code={ country }/>
          ) : null}
          { city ? (
            <Text style={styles.smallText}>{ city }</Text> 
          ) : null}
        </View>
        {partTime ? (
          <Text style={styles.smallText}>Part time possible</Text>
        ) : null}
        <View style = {styles.payments}>
          {
            payments.map((indexItem, index) => {
              return(
                <Text key={index} style={styles.smallText}>{I18n.t(`common.payment.${PAYMENTS.find(location => location.index===indexItem).slug}`)}</Text>
              )
            })
          }
        </View>
          <View style = {{flexDirection: 'row'}}>
              {description ? (
                  <Button style={styles.linkButton} onPress={() => this.handleOnDescription(description)}>
                      <Text style={ [styles.smallActionText, styles.underline] }> Full Description </Text>
                  </Button>) : null
              }
              {link ? (
                  <Button style={styles.linkButton} onPress={() => this.handleLink(link)}>
                      <Text style={ [styles.smallActionText, styles.underline] }> Link </Text>
                  </Button>
              ) : null}
          </View>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  largeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    paddingTop: 20
  },
  mediumText: {
    fontSize: 14,
    color: '#000',
    paddingTop: 15
  },
  smallText: {
    paddingTop: 8,
    fontSize: 12,
    color: '#000'
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center'
  },
  linkButton: {
    backgroundColor: '#fff'
  },
  countryFlag: {
    width: 60,
    height: 45,
    marginTop: 16,
    marginRight: 10
  },
  cardStyle: {
    borderRadius: 8,
    backgroundColor: 'white',
    padding: 8,
    flexDirection: 'column',
    flex: 1,
    alignItems: 'center',
    paddingBottom: 20
  },
  payments: {
    flexDirection: 'row',
    width: 200,
    justifyContent: 'space-around'
  },
  country: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  localOrRemote: {
    flexDirection: 'row',
    width: 100,
    justifyContent: 'space-around'
  },
  smallActionText: {
      fontSize: 12,
      color: '#888'
  },
  underline: {
      textDecorationLine: 'underline'
  }
})
