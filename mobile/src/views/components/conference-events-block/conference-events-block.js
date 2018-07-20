import React, { Component } from "react";
import { View } from "react-native";
import moment from "moment";
import PropTypes from "prop-types";
import EStyleSheet from "react-native-extended-stylesheet";
import { Grid, Section, Block } from "react-native-responsive-layout";
import { Content, Card, CardItem, Text, Body } from "native-base";
import ConferenceEvent from "../conference-event/conference-event";

class ConferenceEventsBlock extends Component {
  renderBlockStartDate() {
    return <Text>{moment(this.props.event.startDate).format("hh:mm A")}</Text>;
  }

  render() {
    return (
      <View style={styles.mainViewContainer}>
        <Content padder>
          <Card>
            <CardItem>
              <Body>
                <View style={styles.eventsStartDateHeaderContainer}>
                  {this.renderBlockStartDate()}
                </View>
                <Grid stretchable>
                  <Section stretch>
                    <View style={styles.eventsBlockContainer}>
                      {this.props.event.classes.map(singleClass => {
                        return (
                          <Block
                            style={{ flexGrow: 1 }}
                            key={`class-${singleClass.title}`}
                            xsSize="1/1"
                            smSize="1/2"
                            lgSize="1/3"
                            xlSize="1/4"
                            xxlSize="1/4"
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
                        );
                      })}
                    </View>
                  </Section>
                </Grid>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  mainViewContainer: {
    flex: 1
  },
  eventsBlockContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  eventsStartDateHeaderContainer: {
    alignSelf: "center"
  }
});

ConferenceEventsBlock.propTypes = {
  event: PropTypes.shape({
    startDate: PropTypes.string.isRequired,
    endDate: PropTypes.string.isRequired,
    classes: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
        persons: PropTypes.arrayOf(PropTypes.string).isRequired
      })
    )
  }).isRequired
};

export default ConferenceEventsBlock;
