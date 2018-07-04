import { Button, Card, Content, Left, ListItem, Radio, Right, Text } from 'native-base'
import PropTypes from 'prop-types'
import React from 'react'
import I18n from '../../../../../locales/i18n'

const options = [
  {
    slug: 'meeting'
  },
  {
    slug: 'projects'
  },
  {
    slug: 'metting_investors'
  }
]

class CommonProfileType extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: -1,
      selectedValue: ''
    }
  }

  render () {
    return (
      <Card style={ { padding: 8 } }>
        <Text style={ { fontSize: 24 } }>{ I18n.t('flow_page.common.profile_type.title') }</Text>
        <Content>
          {
            options.map((option, index) => {
              return (
                <ListItem style={ { width: '100%' } } key={ option.slug } onPress={ () => this.handleChange(index) }>
                  <Left>
                    <Text>{ I18n.t(`flow_page.common.profile_type.${option.slug}`) }</Text>
                  </Left>
                  <Right>
                    <Radio
                      onPress={ () => this.handleChange(index) }
                      selected={ this.state.selected === index }/>
                  </Right>
                </ListItem>
              )
            })
          }
        </Content>
        <Button success
                rounded
                block
                onPress={ this.handleSubmit }
                style={ { marginTop: 16 } }>
          <Text>{ I18n.t('common.next') }</Text>
        </Button>
      </Card>
    )
  }

  handleSubmit = () => {
    this.props.onFill(this.state)
  }
  handleChange = (index) => {
    this.setState({
      selected: index,
      selectedValue: options[index].slug
    })
  }
}

CommonProfileType.propTypes = {
  onFill: PropTypes.func.isRequired
}

export default CommonProfileType
