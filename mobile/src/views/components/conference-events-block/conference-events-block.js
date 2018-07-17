import React, { Component } from "react"
import { View } from "react-native"
import moment from "moment"
import PropTypes from "prop-types"
import EStyleSheet from "react-native-extended-stylesheet"
import { Grid, Section, Block } from "react-native-responsive-layout"
import { Content, Card, CardItem, Text, Body } from "native-base"
import ConferenceEvent from "../conference-event/conference-event"

class ConferenceEventsBlock extends Component {
  renderBlockStartDate() {
    return <Text>{moment(this.props.event.startDate).format("hh:mm A")}</Text>
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <View style={styles.eventsStartDateHeaderContainer}>
                  {this.renderBlockStartDate()}
                </View>
                <Grid stretchable>
                  <Section stretch>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: "row",
                        flexWrap: "wrap"
                      }}
                    >
                      {this.props.event.classes.map(singleClass => {
                        return (
                          <Block
                            style={{ flexGrow: 1 }}
                            key={`class-${singleClass.title}`}
                            xsSize="1/1"
                            smSize="1/2"
                            lg="1/3"
                            xl="1/4"
                            xxl="1/4"
                          >
                            <ConferenceEvent
                              event={{
                                ...singleClass,
                                endDate: moment(
                                  this.props.event.endDate
                                ).format("hh:mm A")
                              }}
                            />
                          </Block>
                        )
                      })}
                    </View>
                  </Section>
                </Grid>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </View>
    )
  }
}

const styles = EStyleSheet.create({
  eventsStartDateHeaderContainer: {
    alignSelf: "center"
  }
})

ConferenceEventsBlock.propTypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    classes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        person: PropTypes.string
      })
    )
  }).isRequired
}

export default ConferenceEventsBlock
