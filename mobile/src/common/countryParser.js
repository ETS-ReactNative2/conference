import * as CountryPicker from 'react-native-country-picker-modal'
const countries = CountryPicker.getAllCountries()

export function fromCca2ToCountryObject (cca2) {
  const country = countries
    .map(country => {
      return country
    })
    .find(country => country.cca2.toUpperCase() === cca2.toUpperCase())
  return { cca2: country.cca2, countryName: country.name.common, calling: country.callingCode }
}
