import { Body, Icon, Left, List, ListItem, Right, Text, View } from 'native-base'
import React from 'react'
import { ScrollView } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet'
import { FlowButton } from '../../design/buttons';
import I18n from '../../../../locales/i18n'
import WhiteLogo from '../../../assets/logos/ico_white.png'
import {
  FUNDING_STAGES,
  GIVEAWAY_TYPES,
  PRODUCT_STAGES,
  TOKEN_TYPES
} from '../../../enums'
import { PAGES_NAMES } from '../../../navigation'
import { NavigationHeader } from '../../components/header/header'
import { ImagePageContainer } from '../../design/image-page-container'

class ProjectMainFilter extends React.Component {
  handleFilterItemClick = (filterSetting) => {
    this.props.navigation.navigate(PAGES_NAMES.FILTER_PAGE, {
      filterSetting, 'filterField': 'project',
      gradient: {
        colors: [ 'rgba(0, 0, 0, 1)', 'rgba(20,25,46, .5)', 'rgba(14, 34, 77, .5)', 'rgba(0,0,0,1)' ],
        levels: [ 0, 0.4, 0.95, 1 ]
      }
    })
  }

  handleSubmit = () => {
    const { goBack } = this.props.navigation
    goBack()
  }

  render () {
    const fields = [
      { items: TOKEN_TYPES, key: 'token_types', stateKey: 'tokenType' },
      { items: PRODUCT_STAGES, key: 'product_stages', stateKey: 'productStage' },
      { items: FUNDING_STAGES, key: 'funding_stages', stateKey: 'fundingStage' },
      { items: GIVEAWAY_TYPES, key: 'giveaway', stateKey: 'giveaway' },
    ]

    return (
      <ImagePageContainer
        customGradient={ {
          colors: [ 'rgba(0, 0, 0, 1)', 'rgba(20,25,46, .5)', 'rgba(14, 34, 77, .5)', 'rgba(0,0,0,1)' ],
          levels: [ 0, 0.4, 0.95, 1 ]
        } }>
        <NavigationHeader
          onBack={ () => this.props.navigation.goBack() }
          iconStyle={ { color: 'white' } }
          title={ I18n.t('search_page.project_filter.main_title') }
          rightIconSource={ WhiteLogo }/>
        <ScrollView>
          <View style={ styles.header }>
            <Text style={ styles.headerText }>{ I18n.t('search_page.project_filter.header') }</Text>
          </View>
          <List style={ styles.filterList }>
            {
              fields.map((filterSetting, index) => (
                <ListItem thumbnail key={ index } style={ styles.investorFilterItem }
                          onPress={ () => this.handleFilterItemClick(filterSetting) }>
                  <Left>
                    <Text style={ styles.Text }>{ I18n.t(`filter_page.type.${filterSetting.key === 'regions' ? 'country' : filterSetting.key }`) }</Text>
                  </Left>
                  <Body style={ styles.nonBorder }>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward"/>
                  </Right>
                </ListItem>
              ))
            }
          </List>
          <View style={ styles.saveButtonContainer }>
            <FlowButton
              style={ styles.saveButton }
              onPress={ this.handleSubmit }>
              <Text style={ styles.buttonCaption }>{ I18n.t('common.next') }</Text>
            </FlowButton>
          </View>
        </ScrollView>
      </ImagePageContainer>
    )
  }
}

const styles = EStyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 20
  },
  filterList: {
    width: '100%',
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5
  },
  investorFilterItem: {
    width: '100%',
    height: 90,
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginLeft: 0,
    paddingLeft: 15,
  },
  Text: {
    color: '#fff',
    fontSize: 14
  },
  nonBorder: {
    borderBottomWidth: 0
  },
  headerText: {
    width: 280,
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  },
  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  saveButtonContainer: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 5
  },
  saveButton: {
    width: '100%',
    height: 72,
    backgroundColor: '#fff',
    borderRadius: 0
  },
  buttonCaption: {
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: 'black'
  }
})

export default ProjectMainFilter
