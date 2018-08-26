import { 
  Body, Button, Col, Card, CardItem, Container, Grid, Header, Footer, Icon, Left, List, ListItem, Thumbnail, Right, Text, View
} from 'native-base';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView } from 'react-native';
import { connect } from 'react-redux';
import * as searchActions from '../../../../search/actions';
import EStyleSheet from 'react-native-extended-stylesheet';
import { PAGES_NAMES } from '../../../../navigation';
import { FUNDING_STAGES, TOKEN_TYPES, PRODUCT_STAGES } from '../../../../enums.js';
import I18n from '../../../../../locales/i18n';

class ProjectsList extends React.Component {
  state = {
    defaults: {}
  }

  componentWillReceiveProps(nextProps) {
    const { filters, updateProjects } = this.props;
    
    if (filters !== nextProps.filters) {
      updateProjects(nextProps.filters);
    }
  }

  handleClickFilter = () => {
    this.props.navigation.navigate(PAGES_NAMES.PROJECT_MAIN_FILTER_PAGE);
  }

  render () {
    const { defaults } = this.state
    const comment = this.props.profiles.length === 0
      ? I18n.t('search_page.no_profile')
      : I18n.t('search_page.change_project');

    return (
      <Container style={ { flex: 1 } }>
        <ScrollView style={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.comment}>{ comment }</Text>
            <Button
              transparent
              style={styles.fullWidth}
              onPress={this.handleClickFilter}>
              <Text style={[styles.underline, styles.centerText, styles.largeText, styles.fullWidth]}>{I18n.t('search_page.update_filter')}</Text>
            </Button>
          </View>
          <List>
            {
              this.props.profiles.length > 0 &&
              this.props.profiles.map(profile =>
                <ProjectItem key={ profile.id } project={ profile } onMark={ () => {}} onClick={() => this.props.onClick(profile)}/>
              )
            }
          </List>
          <View style = {{ height: 190, width: '100%'}} />
        </ScrollView>
      </Container>
    )
  }
}

ProjectItem = ({ project, onMark, onClick }) => {
  const projectPlaceholderUri = 'https://cdn2.iconfinder.com/data/icons/ikooni-outline-seo-web/128/seo3-100-512.png';
  const projectName = project.name ? project.name : 'Undefined Name';
  const tokenType = TOKEN_TYPES.find(item => item.index === project.tokenType);
  const fundingStage = FUNDING_STAGES.find(item => item.index === project.fundingStage);
  const productStage = PRODUCT_STAGES.find(item => item.index === project.productStage);
  
  return (
    <ListItem thumbnail onPress={ onClick } style={styles.listItem} >
      <Left>
        <Thumbnail square large style={styles.portrait} source={{uri: projectPlaceholderUri}} />
      </Left>
      <View style={{flex: 1}}>
        <View style={styles.rowHeader}>
          <Left>
            <Text style={styles.largeText}>{projectName}</Text>
          </Left>
        </View>
        <View style={styles.rowDetail}>
          <View style={{flex: 1}}>
            <Text style={styles.normalText}>
              {
                tokenType ? I18n.t(`common.token_types.${tokenType.slug}`) : ''
              }
            </Text>
          </View>
          <View style={{flex: 0.8}}>
            <Text style={styles.normalText}>
              {
                fundingStage ? I18n.t(`common.funding_stages.${fundingStage.slug}`) : ''
              }
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.normalText}>
              {
                productStage ? I18n.t(`common.product_stages.${productStage.slug}`) : ''
              }
            </Text>
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
    backgroundColor: '#e8e8e8',
    paddingTop: 8
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
  rowHeader: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 16,
    marginRight: 18
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
    textAlign: 'center'
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

ProjectsList.propTypes = {
  profiles: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  updateProjects: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    profiles: state.search.projects,
    filters: state.filter.project
  }
}

const mapDispatchToProps = dispatch => {
  return {
    updateProjects: filters => dispatch(searchActions.updateProjects(filters))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsList)
