import { Icon, Text, View } from 'native-base'
import React from 'react'
import { Image, Linking, TouchableHighlight } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import Flag from 'react-native-flags'
import I18n from '../../../../locales/i18n'
import ColorLogo from '../../../assets/logos/logo-white.png'
import { getDimensions } from '../../../common/dimension-utils'
import { FUNDING_STAGES, GIVEAWAY_TYPES, PRODUCT_STAGES, REGIONS, TOKEN_TYPES } from '../../../enums'
import { PAGES_NAMES } from '../../../navigation'

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
                <Image style={ medium.placeholder } source={ avatar }/>
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
            <Text style={ [ medium.header, medium.amount ] }>Raising ${ fundraisingAmount }</Text>
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
    height: 120,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    overflow: 'hidden'
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

class XL extends React.Component {

  shouldComponentUpdate = () => {
    return false
  }

  handleHiring = () => {
    const { project } = this.props
    this.props.navigation.navigate(PAGES_NAMES.JOBS_PAGE, { project })
  }

  handleLink = (prefix, link) => {
    Linking.canOpenURL(prefix + link)
      .then(supported => {
        if (supported) {
          Linking.openURL(prefix + link)
        } else {
          console.log('Don\'t know how to open URI: ' + prefix + link)
        }
      })
  }

  render () {
    const { project } = this.props

    const { hasAvatar, avatar } = createAvatar(project, 'w=300&h=300')
    const { name, tagline, fundraisingAmount, size, description, notable, jobListings, legalCountry: legal, mainCountry: main } = project

    const tokenType = TOKEN_TYPES.find(item => item.index === project.tokenType)
    const fundingStage = FUNDING_STAGES.find(item => item.index === project.fundingStage)
    const productStage = PRODUCT_STAGES.find(item => item.index === project.productStage)
    const giveaway = GIVEAWAY_TYPES.find(item => item.index === project.giveaway)

    const { itemWidth, sliderWidth } = getDimensions()

    const avatarSize = itemWidth / 3
    const avatarStyle = {
      width: avatarSize,
      height: avatarSize
    }

    const placeholderStyle = {
      width: 60,
      height: 80,
      marginLeft: (avatarSize - 60) / 2,
      marginRight: (avatarSize - 60) / 2,
      marginTop: (avatarSize - 80) / 2,
      marginBottom: (avatarSize - 80) / 2
    }

    const verticalLineHeight = {
      height: avatarSize - 8
    }
    const horizontalLineWidth = {
      width: itemWidth - 10
    }

    return (
      <View style={ styles.cardWithoutMargin }>
        <View style={ xl.cardContent }>
          <View style={ styles.inline }>
            <View style={ xl.avatarContainer }>
              { hasAvatar ?
                <Image style={ avatarStyle } source={ avatar }/> :
                <View style={ avatarStyle }>
                  <Image style={ placeholderStyle } source={ avatar }/>
                </View>
              }
            </View>
            <View style={ xl.infoContainer }>
              <View>
                <Text style={ xl.title }>{ name }</Text>
              </View>
              <View style={ { marginTop: 2, marginBottom: 2 } }>
                <Text style={ medium.subtitle }>{ tagline ? tagline : '...'}</Text>
              </View>
              <View style={ styles.inline }>
                <React.Fragment>
                  { main ?
                    <View style={ {
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center',
                      marginRight: 4
                    } }>
                      <Flag style={ xl.flag } code={ main }/>
                    </View> :
                    null
                  }
                  { legal ?
                    <View style={ {
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignContent: 'center'
                    } }>
                      <Flag style={ [ xl.flag ] } code={ legal }/>
                    </View> :
                    null
                  }
                </React.Fragment>
              </View>
            </View>
          </View>
          <View style={ styles.inline }>
            <View style={ xl.boxContainer }>
              <Text style={ [ xl.header, styles.spaceAbove, styles.spaceBelow ] }>{ I18n.t('cards.description')}</Text>
              <Text style={ xl.subtitle }>{ description ? description : '...' }</Text>
              <Text style={ [ xl.header, styles.spaceAbove, styles.spaceBelow ] }>{ I18n.t('cards.notable')
                .toUpperCase() }</Text>
              <Text style={ xl.subtitle }>{ notable ? notable : '...' }</Text>
            </View>
          </View>
          <View style={ [ xl.line, horizontalLineWidth ] }/>
          <View style={ styles.inline }>
            <View style={ xl.boxContainer }>
              <Text style={ xl.header }>{ I18n.t('cards.technology').toUpperCase() }</Text>
              <Text style={ xl.subtitle }>{ I18n.t(`common.token_types.${tokenType.slug}`) }</Text>
              <Text style={ [ xl.header, { marginTop: 16 } ] }>{ I18n.t('cards.product').toUpperCase() }</Text>
              <Text style={ xl.subtitle }>{ I18n.t(`common.product_stages.${productStage.slug}`) }</Text>
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ xl.boxContainer }>
              <Text style={ xl.header }>{ I18n.t('cards.stage').toUpperCase() }</Text>
              <Text style={ xl.subtitle }>{ I18n.t(`common.funding_stages.${fundingStage.slug}`) }</Text>
              <Text style={ [ xl.header, { marginTop: 16 } ] }>{ I18n.t('cards.size').toUpperCase() }</Text>
              <Text style={ xl.subtitle }>{ size }</Text>
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ xl.boxContainer }>

              <Text style={ [ xl.header ] }>{ I18n.t('cards.raising').toUpperCase() }</Text>
              <Text style={ xl.subtitle }>${ fundraisingAmount }</Text>
              <Text ellipsizeMode={ 'tail' } numberOfLines={ 1 } style={ [ xl.header, { marginTop: 16 } ] }>{ I18n.t('cards.offer').toUpperCase() }</Text>
              <Text style={ xl.subtitle }>{ I18n.t(`common.giveaways.${giveaway.slug}`) }</Text>
            </View>
          </View>
          <View style={ [ xl.line, horizontalLineWidth ] }/>
          <View style={ styles.inline }>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { project.whitepaper ? (
                <TouchableHighlight onPress={ () => this.handleLink(project.whitepaper) } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'map' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.whitepaper') }</Text>
                  </View>
                </TouchableHighlight>
              ) : null }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { project.news ? (
                <TouchableHighlight onPress={ () => this.handleLink(project.news) } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'newspaper-o' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.news') }</Text>
                  </View>
                </TouchableHighlight>
              ) : null }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { project.telegram ? (
                <TouchableHighlight onPress={ () => this.handleLink('https://t.me/', project.telegram) } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'telegram' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.telegram') }</Text>
                  </View>
                </TouchableHighlight>
              ) : null }
            </View>
          </View>
          <View style={ [ xl.line, horizontalLineWidth ] }/>
          <View style={ styles.inline }>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { project.github ? (
                <TouchableHighlight onPress={ () => this.handleLink('https://github.com/', project.github) } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'github' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.github') }</Text>
                  </View>
                </TouchableHighlight>
              ) : null }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { project.twitter ? (
                <TouchableHighlight onPress={ () => this.handleLink('https://twitter.com/', project.twitter) } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'twitter' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.twitter') }</Text>
                  </View>
                </TouchableHighlight>
              ) : null }
            </View>
            <View style={ [ xl.verticalLine, verticalLineHeight ] }/>
            <View style={ [ xl.boxContainer, styles.center ] }>
              { project.website ? (
                <TouchableHighlight onPress={ () => this.handleLink(project.website) } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'globe' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('common.website') }</Text>
                  </View>
                </TouchableHighlight>
              ) : null }
            </View>
          </View>
          { (jobListings && jobListings.length > 0) ? (
            <React.Fragment>
              <View style={ [ xl.line, horizontalLineWidth ] }/>
              <View style={ [ styles.center, { height: avatarSize } ] }>
                <TouchableHighlight onPress={ this.handleHiring } underlayColor='transparent'>
                  <View>
                    <Icon style={ { textAlign: 'center', color: 'white' } } type={ 'FontAwesome' }
                          name={ 'handshake-o' }/>
                    <Text style={ [ xl.subtitle, { textAlign: 'center' } ] }>{ I18n.t('project_page.hiring') }</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </React.Fragment>
          ) : null }
        </View>
      </View>
    )
  }
}

const xl = EStyleSheet.create({
  avatarContainer: {
    flex: 1,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
    overflow: 'hidden'
  },
  infoContainer: {
    flex: 2,
    margin: 8
  },
  line: {
    height: 1,
    marginLeft: 4,
    marginRight: 4,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  verticalLine: {
    height: 136,
    width: 1,
    marginTop: 4,
    marginBottom: 5,
    backgroundColor: 'rgba(255,255,255,.25)'
  },
  placeholderContainer: {
    width: 200,
    height: 150,
  },
  answer: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  question: {
    fontSize: 12,
    textAlign: 'center',
    fontWeight: 'normal',
    color: 'white',
    marginBottom: 8
  },
  details: {
    margin: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4
  },
  header: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 12,
    fontWeight: 'normal',
    color: 'rgba(255, 255, 255, .75)'
  },
  flag: {
    width: 45,
    height: 30
  },
  boxContainer: {
    flex: 1,
    padding: 8
  },
  linkedin: {
    color: 'white',
    textAlign: 'center'
  }
})

const styles = EStyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    margin: 4
  },
  cardWithoutMargin: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
  },
  inline: {
    flexDirection: 'row'
  },
  center: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  spaceAbove: {
    marginTop: 4,
  },
  spaceBelow: {
    marginBottom: 4
  }
})

export default {
  Small,
  Medium,
  XL
}
