import { Text, View } from 'native-base'
import React from 'react'
import { Image, TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/logo-white.png'
import { FUNDING_STAGES, PRODUCT_STAGES, TOKEN_TYPES } from '../../../enums'

function createAvatar (project, extraQuery) {
  const hasAvatar = (project.imageUrl && project.imageUrl !== '') ? true : false
  const avatar = hasAvatar
    ? { uri: `${project.imageUrl}?${extraQuery}` }
    : ColorLogo
  return {
    hasAvatar, avatar
  }
}

const Small = ({ project, onClick }) => {

  const { hasAvatar, avatar } = createAvatar(project, 'w=200&h=200')
  const name = project.name
  const tagline = project.tagline

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
      <View style={ [ styles.card, small.card ] }>
        <View style={ small.cardContent }>
          <View style={ small.avatarContainer }>
            { hasAvatar ?
              <Image style={ small.avatar } source={ avatar }/> :
              <View style={ small.placeholderContainer }>
                <Image style={ small.placeholder } source={ avatar }/>
              </View>
            }
          </View>
          <View style={ small.verticalLine }/>
          <View style={ small.infoContainer }>
            <Text style={ small.title }>{ `${name}` }</Text>
            <Text style={ small.subtitle }>{ tagline }</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const small = EStyleSheet.create({
  card: {
    width: 300
  },
  avatarContainer: {
    justifyContent: 'center',
    alignContent: 'center'
  },
  cardContent: {
    flexDirection: 'row'
  },
  avatar: {
    width: 100,
    height: 100
  },
  placeholderContainer: {
    width: 100,
    height: 100,
  },
  placeholder: {
    width: 50,
    height: 70,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 15,
    marginBottom: 15
  },
  infoContainer: {
    margin: 16,
    flex: 1,
    justifyContent: 'center'
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4
  },
  verticalLine: {
    width: 1,
    height: 84,
    marginTop: 8,
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  flag: {
    width: 24,
    height: 16,
    marginLeft: 8
  }
})

const Medium = ({ project, onClick }) => {
  const { hasAvatar, avatar } = createAvatar(project, 'w=240&h=240')
  const { name, tagline, fundraisingAmount } = project

  const tokenType = TOKEN_TYPES.find(item => item.index === project.tokenType)
  const fundingStage = FUNDING_STAGES.find(item => item.index === project.fundingStage)
  const productStage = PRODUCT_STAGES.find(item => item.index === project.productStage)

  return (
    <TouchableHighlight onPress={ onClick } underlayColor='transparent'>
      <View style={ styles.card }>
        <View style={ medium.cardContent }>
          <View style={ medium.avatarContainer }>
            { hasAvatar ?
              <Image style={ medium.avatar } source={ avatar }/> :
              <View style={ medium.placeholderContainer }>
                <Image style={ medium.placeholder } source={ avatar }/> :
              </View>
            }
          </View>
          <View style={ medium.infoContainer }>
            <View style={ [ styles.inline, medium.details ] }>
              <Text style={ medium.title }>{ name }</Text>
              { project.main ?
                <Flag style={ medium.flag } code={ project.main }/> :
                null
              }
              { project.legal ?
                <Flag style={ medium.flag } code={ project.legal }/> :
                null
              }
            </View>
            <View style={ { marginTop: 4, marginBottom: 4 } }>
              <Text style={ medium.subtitle }>{ tagline }</Text>
            </View>
            <View style={ styles.inline }>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.technology') }</Text>
                <View style={ { flex: 1 } }>
                  <Text style={ medium.subtitle }>
                    {
                      tokenType ? I18n.t(`common.token_types.${tokenType.slug}`) : ''
                    }
                  </Text>
                </View>
              </View>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.stage') }</Text>
                <View style={ { flex: 0.8 } }>
                  <Text style={ medium.subtitle }>
                    {
                      fundingStage ? I18n.t(`common.funding_stages.${fundingStage.slug}`) : ''
                    }
                  </Text>
                </View>
              </View>
              <View style={ medium.rowDetail }>
                <Text style={ medium.header }>{ I18n.t('cards.product') }</Text>
                <View style={ { flex: 1 } }>
                  <Text style={ medium.subtitle }>
                    {
                      productStage ? I18n.t(`common.product_stages.${productStage.slug}`) : ''
                    }
                  </Text>
                </View>
              </View>
            </View>
            <Text style={ [medium.header, medium.amount] }>Raising ${fundraisingAmount}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  )
}

const medium = EStyleSheet.create({
  cardContent: {
    flexDirection: 'row'
  },
  avatarContainer: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden'
  },
  avatar: {
    width: 120,
    height: 120
  },
  placeholderContainer: {
    width: 120,
    height: 120,
  },
  placeholder: {
    width: 54,
    height: 70,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    marginBottom: 25
  },
  details: {
    marginTop: 8
  },
  infoContainer: {
    margin: 8,
    flex: 1
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4
  },
  header: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 10,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  amount: {
    marginTop: 4
  },
  flag: {
    width: 24,
    height: 16,
    marginLeft: 8
  },
  rowDetail: {
    flex: 1,
    justifyContent: 'flex-start'
  }
})

const styles = EStyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    margin: 4
  },
  inline: {
    flexDirection: 'row'
  }
})

export default {
  Small,
  Medium
}
