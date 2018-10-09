import EStyleSheet from 'react-native-extended-stylesheet'

export const layout =  EStyleSheet.create({
  content: {
    flex: 1,
    paddingBottom: 49
  },
  stretched: {
    flex: 1
  }
})

export const auth = EStyleSheet.create({
  contentContainer: {
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24
  },
  textStyling: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 24,
    paddingBottom: 24
  },
  inputContainer: {
    marginBottom: 24
  },
  button: {
    marginTop: 32,
    flex: 0
  },
  login: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 16,
    textDecorationLine: 'underline',
    marginLeft: 16
  },
  lunaContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16
  },
  policyAndConditionsWrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  policyAndConditions: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    textDecorationLine: 'underline',
    marginRight: 8
  }
})

export const terms = EStyleSheet.create({
  contentContainer: {
    marginTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 24
  },
  description: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#000000',
    textAlign: 'justify'
  },
  sectionHeader: {
    fontFamily: 'Arial',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    textAlign: 'left',
    color: '#005F9F'
  },
  sectionBold: {
    fontFamily: 'Arial',
    fontSize: 16,
    marginTop: 8,
    marginBottom: 8,
    color: '#000000',
    fontWeight: 'bold'
  },
  sectionIndent: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#000000',
    textAlign: 'justify',
    marginLeft: 16,
    marginBottom: 8
  },
  emailAddress: {
    fontFamily: 'Arial',
    fontSize: 12,
    color: '#005F9F'
  }
})
