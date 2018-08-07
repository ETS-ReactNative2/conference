import { Button, Card, Left, ListItem, Radio, Right, Text, View } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import { StyleSheet } from 'react-native'
import CountryPicker from 'react-native-country-picker-modal'
import { Chip, Selectize } from 'react-native-material-selectize'
import { connect } from 'react-redux'
import validator from 'validator'
import I18n from '../../../../../locales/i18n'
import { JOB_LOCATION, PAYMENTS, ROLES, SKILLS } from '../../../../enums'
import { signUpActions } from '../../../../signup'
import ValidatedInput from '../../../components/validated-input/validated-input'

class EmployerJobs extends React.Component {
  constructor (props) {
    super(props)
    const { roles, ...jobs } = this.props.employer
    this.state = {
      ...jobs
    }
    this.state.isFormValid = this.isFormValid()
  }

  handleFieldChange = (text, role, name) => {
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        [ name ]: text
      }

    }, this.validateForm)
  }

  validateJobLink = (jobLink, jobDescription) => {
    const jobLinkExists = !validator.isEmpty(jobLink)
    const jobDescriptionExists = !validator.isEmpty(jobDescription)
    return jobDescriptionExists || jobLinkExists
  }

  validateJobDescription = (jobLink, jobDescription) => {
    const jobLinkExists = !validator.isEmpty(jobLink)
    const jobDescriptionExists = !validator.isEmpty(jobDescription)
    return jobDescriptionExists || jobLinkExists
  }

  validateJobCity = (city) => {
    return !validator.isEmpty(city)
  }

  handleCheck = (role, field) => {
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        [ field ]: !this.state[ role ][ field ]
      }
    }, this.validateForm)
  }

  onChipAdded = (chipToAdd, role, callBack) => {
    const itemsCopy = [ ...this.state[ role ].keywords ]
    itemsCopy.push(chipToAdd)
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        keywords: itemsCopy
      }
    })
    // passing true to callback let's library add item to list of selected items
    callBack(true)
  }

  onChipRemoved = (chipToRemove, role, callBack) => {
    const itemsCopy = [ ...this.state[ role ].keywords ]
    const idOfChipToRemove = chipToRemove.id
    const filteredChips = itemsCopy.filter(singleChip => singleChip.id !== idOfChipToRemove)
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        keywords: filteredChips
      }
    })
    // passing true to callback allows library to remove items from list of selected items
    callBack(true)
  }

  handleCheckboxClickLocation = (index, role) => {
    console.log({ index, role })
    let location = [ ...this.state[ role ].location ]
    const locationIndex = location.indexOf(index)
    if (locationIndex !== -1) {
      location = location.filter(pay => pay !== index)
    } else {
      location.push(index)
    }
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        location
      }
    }, this.validateForm)
  }

  isCheckboxSelectedLocation = (index, role) => {
    return this.state[ role ].location.indexOf(index) !== -1
  }

  handleCheckboxClick = (index, role) => {
    let payments = [ ...this.state[ role ].payments ]
    const paymentIndex = payments.indexOf(index)
    if (paymentIndex !== -1) {
      payments = payments.filter(pay => pay !== index)
    } else {
      payments.push(index)
    }
    this.setState({
      [ role ]: {
        ...this.state[ role ],
        payments
      }
    }, this.validateForm)
  }

  isCheckboxSelected = (index, role) => {
    return this.state[ role ].payments.indexOf(index) !== -1
  }

  render () {
    return (
      <React.Fragment>
        { this.props.employer.roles
          .map(role => ROLES.find(job => job.index === role).slug)
          .map(role => {
            return (
              <Card key={ role } style={ { padding: 8, marginBottom: 16 } }>
                <Text style={ { fontSize: 24 } }>{ I18n.t(`common.roles_job.${role}`) }</Text>
                <Selectize
                  selectedItems={ this.state[ role ] }
                  items={ SKILLS }
                  label={ I18n.t('flow_page.employer.keyword.title') }
                  textInputProps={ {
                    placeholder: I18n.t('flow_page.employer.keyword.placeholder')
                  } }
                  renderRow={ (id, onPress, item) => (
                    <ListItem style={ styles.listRow } key={ id }
                              onPress={ () => this.onChipAdded(item, role, onPress) }>
                      <Text>{ item.text }</Text>
                    </ListItem>
                  ) }
                  renderChip={ (id, onClose, item, style, iconStyle) => (
                    <Chip
                      key={ id }
                      iconStyle={ iconStyle }
                      onClose={ () => this.onChipRemoved(item, role, onClose) }
                      text={ item.text }
                      style={ style }
                    />
                  ) }
                />
                <ValidatedInput floatingLabel
                                value={ this.state[ role ].link }
                                labelText={ I18n.t('flow_page.employer.job.link') }
                                isError={ !this.validateJobLink(this.state[ role ].link,
                                  this.state[ role ].description) }
                                errorMessage={ I18n.t('common.errors.incorrect_job_link') }
                                onChangeText={ (newValue) => this.handleFieldChange(newValue, role, 'link') }/>
                <ValidatedInput floatingLabel
                                multiline={ true }
                                numberOfLines={ 5 }
                                value={ this.state[ role ].description }
                                labelText={ I18n.t('flow_page.employer.job.description') }
                                isError={ !this.validateJobDescription(this.state[ role ].link,
                                  this.state[ role ].description) }
                                errorMessage={ I18n.t('common.errors.incorrect_job_description') }
                                onChangeText={ (newValue) => this.handleFieldChange(newValue, role, 'description') }/>

                <Text style={ { fontSize: 24, marginTop: 16 } }>{ I18n.t('flow_page.employer.location.title') }</Text>
                { JOB_LOCATION.map(({ slug, index }) => {
                  return (
                    <ListItem
                      onPress={ () => this.handleCheckboxClickLocation(index, role) }
                      key={ `payment-${slug}` }>
                      <Left>
                        <Text>{ I18n.t(`common.job_location.${slug}`) }</Text>
                      </Left>
                      <Right>
                        <Radio
                          onPress={ () => this.handleCheckboxClickLocation(index, role) }
                          selected={ this.isCheckboxSelectedLocation(index, role) }/>
                      </Right>
                    </ListItem>
                  )
                }) }
                <View style={ { marginTop: 16, marginBottom: 16 } }/>
                {
                  this.state[ role ].location.includes(1) && (
                    <React.Fragment>
                      <CountryPicker
                        style={ { marginTop: 16 } }
                        onChange={ value => {
                          this.setState({
                            [ role ]: {
                              ...this.state[ role ],
                              country: { cca2: value.cca2, countryName: value.name, calling: value.callingCode }
                            }
                          })
                        } }
                        filterable
                        closeable
                        cca2={ this.state[ role ].country.cca2 }
                        translation="eng"
                        styles={ {
                          touchFlag: {
                            alignItems: 'flex-start',
                            justifyContent: 'center',
                            height: 24
                          },
                        } }
                      >

                        <View style={ {
                          flex: 1,
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          height: 19
                        } }>
                          { CountryPicker.renderFlag(this.state[ role ].country.cca2) }
                          <Text style={ { marginLeft: 8 } }>{ this.state[ role ].country.countryName }</Text>
                        </View>
                      </CountryPicker>
                      <ValidatedInput floatingLabel
                                      style={ { marginTop: 16 } }
                                      multiline={ true }
                                      numberOfLines={ 5 }
                                      value={ this.state[ role ].city }
                                      labelText={ I18n.t('flow_page.employer.job.city') }
                                      isError={ !this.validateJobCity(this.state[ role ].city) }
                                      errorMessage={ I18n.t('common.errors.incorrect_job_city') }
                                      onChangeText={ (newValue) => this.handleFieldChange(newValue, role, 'city') }/>
                    </React.Fragment>
                  ) }
                <Text style={ { fontSize: 24, marginTop: 16 } }>{ I18n.t('flow_page.employer.payment.title') }</Text>
                { PAYMENTS.map((payment, index) => {
                  return (
                    <ListItem
                      onPress={ () => this.handleCheckboxClick(index, role) }
                      key={ `payment-${payment.slug}` }>
                      <Left>
                        <Text>{ I18n.t(`common.payment.${payment.slug}`) }</Text>
                      </Left>
                      <Right>
                        <Radio
                          onPress={ () => this.handleCheckboxClick(index, role) }
                          selected={ this.isCheckboxSelected(index, role) }/>
                      </Right>
                    </ListItem>
                  )
                }) }
              </Card>
            )
          }) }
        <Card style={ { padding: 8, marginBottom: 16 } }>
          <Button success
                  rounded
                  block
                  disabled={ !this.state.isFormValid }
                  onPress={ this.handleSubmit }>
            <Text>{ I18n.t('common.next') }</Text>
          </Button>
        </Card>
      </React.Fragment>
    )
  }

  validateForm = () => {
    const isFormValid = this.isFormValid()
    this.setState({ isFormValid })
  }

  isFormValid = () => {
    const { isFormValid, ...jobs } = this.state
    return Object.values(jobs)
      .map(({ link, description, payments, location, city }) => {
        return this.validateJobLink(link, description) && payments.length > 0 && location.length > 0 && (location.includes(2) ? this.validateJobCity(city) : true)
      })
      .reduce((previous, current) => {
        return previous && current
      })

  }

  handleSubmit = () => {
    const { isFormValid, ...jobs } = this.state
    this.props.save({
      ...jobs
    })
    this.props.onFill({
      done: true
    })
  }
}

const styles = StyleSheet.create({
  chip: {
    paddingRight: 2
  },
  chipIcon: {
    height: 24,
    width: 24
  },
  list: {
    backgroundColor: '#fff'
  },
  listRow: {
    paddingVertical: 8,
    paddingHorizontal: 10
  },
  listWrapper: {
    flexDirection: 'row'
  },
  listIcon: {
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.38)',
    height: 40,
    width: 40,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  listInitials: {
    fontSize: 20,
    lineHeight: 24,
    color: '#fff'
  },
  listNameText: {
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 14,
    lineHeight: 21
  },
  listEmailText: {
    color: 'rgba(0, 0, 0, 0.54)',
    fontSize: 14,
    lineHeight: 21
  }
})

EmployerJobs.propTypes = {
  onFill: PropTypes.func.isRequired
}

const mapStateToProps = state => {
  return {
    employer: state.signUp.employer
  }
}

const mapDispatchToProps = dispatch => {
  return {
    save: employerInfo => dispatch(signUpActions.saveProfileEmployer(employerInfo))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmployerJobs)
