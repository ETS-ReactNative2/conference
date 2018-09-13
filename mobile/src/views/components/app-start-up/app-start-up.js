import React, { Component } from 'react'
import { connect } from 'react-redux'
import I18n from '../../../../locales/i18n'
import { startUpActions } from '../../../startup'
import LoadingPage from '../../components/loading-page/loading-page'

class AppStartUp extends Component {
  componentDidMount() {
    this.props.loadApp();
  }
  
  render() {
    return (
      <React.Fragment>
        {this.props.appLoaded && (
          <React.Fragment>
            {this.props.children}
          </React.Fragment>
        )}
        {!this.props.appLoaded && (
          <LoadingPage isLoading message={I18n.t('login_page.spinner_text')} />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    appLoaded: state.startup.loaded
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadApp: () => dispatch(startUpActions.loadApp())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppStartUp);
