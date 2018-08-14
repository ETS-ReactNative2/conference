import { Text } from "native-base";
import React from "react";
import PropTypes from "prop-types";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { ERROR_COLOR, OK_COLOR } from "../../design/constants";

export class Alert extends React.Component {
  getBorderStyle(status) {
    const stylesArray = [styles.container];
    const stylesMapping = {
      success: styles.borderSuccess,
      error: styles.borderError
    };
    if (stylesMapping[status]) {
      stylesArray.push(stylesMapping[status]);
    }
    if (status === "error" && this.props.errorStyleOverride) {
      stylesArray.push(this.props.errorStyleOverride.border)
    }
    return stylesArray;
  }

  getTextStyling(status) {
    const stylesArray = [styles.text];
    const stylesMapping = {
      success: styles.textSuccess,
      error: styles.textError
    };
    if (stylesMapping[status]) {
      stylesArray.push(stylesMapping[status]);
    }
    if (status === "error" && this.props.errorStyleOverride) {
      stylesArray.push(this.props.errorStyleOverride.text)
    }
    return stylesArray;
  }

  render() {
    return (
      <View style={this.getBorderStyle(this.props.color)}>
        <Text
          style={this.getTextStyling(this.props.color)}
          adjustsFontSizeToFit
        >
          {this.props.message}
        </Text>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 10,
    height: 50,
    flex: 1,
    justifyContent: 'center'
  },
  borderSuccess: {
    borderColor: OK_COLOR
  },
  borderError: {
    borderColor: ERROR_COLOR
  },
  text: {
    fontFamily: "Montserrat-Regular",
    fontSize: 14,
    textAlign: 'center'
  },
  textSuccess: {
    color: OK_COLOR
  },
  textError: {
    color: ERROR_COLOR
  }
});

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["error", "success"]).isRequired,
  errorStyleOverride: PropTypes.shape({
    border: PropTypes.shape({
      borderColor: PropTypes.string
    }),
    text: PropTypes.shape({
      color: PropTypes.string
    })
  })
};

export default Alert;
