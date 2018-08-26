import { 
  Body, Button, Col, Card, CardItem, Container, Grid, Header, Footer, Icon, Left, List, ListItem, Thumbnail, Right, Text, View
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, ListView, Image } from 'react-native';
import {connect} from 'react-redux';
import * as searchActions from '../../../../search/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import Flag from 'react-native-flags';
import { getUrl } from '../../../../common/fake-randomizer';
import { ROLES, JOB_LOCATION } from '../../../../enums.js';
import I18n from '../../../../../locales/i18n';

class ProfessionalsList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showFilters: false,
      defaults: {}
    }
  }

  handleShowFilter = () => {
    this.setState({
      showFilters: !this.state.showFilters
    })
  }

  handleSearch = newDefaults => {
    this.setState({
      showFilters: false,
      defaults: {
        ...this.state.defaults,
        ...newDefaults
      }
    }, () => {
      this.props.updateProfessionals(newDefaults)
    })
  }

  render () {
    const { showFilters, defaults } = this.state

    return (
      <Container style={ { flex: 1 } }>
        <ScrollView>
          <Header>
            <Left>
              <Text>{ I18n.t('search_page.tab_label_professional') }</Text>
            </Left>
            <Right>
              <Button
                transparent
                dark={ !showFilters }
                info={ showFilters }
                iconLeft
                onPress={ this.handleShowFilter }>
                <Icon active name={ 'cog' }/>
                <Text>{ I18n.t('search_page.filters') }</Text>
              </Button>
            </Right>
          </Header>
          { this.props.profiles.length === 0 && (
            <Grid style={ { alignItems: 'center', justifyContent: 'center' } }>
              <Col>
                <Text>{ I18n.t('search_page.no_profile') }</Text>
              </Col>
            </Grid>
          ) }
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <ProfessionalItem key={ profile.id } professional={ profile } onMark={ () => {}} onClick={() => this.props.onClick(profile)}/>
              )
            }
          </List>
          <View style = {{ height: 190, width: '100%'}} />
        </ScrollView>
      </Container>
    )
  }
}

ProfessionalItem = ({ professional, onMark, onClick }) => {
  const portraitPlaceholderUri = getUrl()
  const firstName = professional.user.firstName;
  const lastName = professional.user.lastName;
  const role = professional.role === 12 
              ? professional.roleOtherText
              : I18n.t(`common.roles.${ROLES.find(item => item.index = professional.role).slug}`);
  const skills = professional.skillsText;
  const isRelocated = 'Relocate';
  const localRemoteOptions = professional.localRemoteOptions;

  return (
    <ListItem thumbnail onPress={ onClick } style={styles.listItem} >
      <Left>
        <Thumbnail square large style={styles.portrait} source={{uri: portraitPlaceholderUri}} />
        <Flag style={styles.countryFlag} code={professional.country} />
      </Left>
      <View style={{flex: 1}}>
        <View style={styles.rowHeader}>
          <Left>
            <Text style={styles.largeText}>{`${firstName} ${lastName}`}</Text>
          </Left>
          <Right>
          </Right>
        </View>
        <View style={styles.rowDetail}>
          <View style={{flex: 1}}>
            <Text style={styles.normalText}>{role}</Text>
            <Text style={styles.normalText}>{skills}</Text>
          </View>
          <View style={{flex: 0.3}}>
            <Text style={styles.normalText}>{isRelocated}</Text>
            {
              localRemoteOptions.map(item => {
                const option = I18n.t(`common.job_location.${JOB_LOCATION.find(ele => ele.index === item).slug}`);
                return (
                  <Text style={styles.normalText}>{option}</Text>
                )
              })
            }
          </View>
        </View>
      </View>
    </ListItem>
  )
}

const styles = EStyleSheet.create({
  centerText: {
    textAlign: 'center'
  },
  fullWidth: {
    width: '100%'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#00000000'
  },
  listItem: {
    height: 100,
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
    width: 97,
    height: 100
  },
  countryFlag: {
    width: 15,
    height: 20,
    padding: 0,
    marginLeft: -15,
    marginTop: 'auto',
    marginBottom: -3
  },
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 18,
    marginTop: 8,
    marginBottom: 2
  },
  rowDetail: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginLeft: 16,
    marginRight: 18,
    marginBottom: 11
  },
  normalText: {
    fontSize: 11,
    fontFamily: 'Helvetica',
    textAlign: 'left'
  },
  largeText: {
    fontSize: 14,
    fontFamily: 'Helvetica'
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
    textAlign: 'center',
    color: 'white'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

ProfessionalsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateProfessionals: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.professionals
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProfessionals: filters => dispatch(searchActions.updateProfessionals(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfessionalsList)
