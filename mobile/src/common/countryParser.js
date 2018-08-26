import * as CountryPicker from 'react-native-country-picker-modal'

export function fromCca2ToCountryObject (cca2) {
  console.log({ cca2 })
  const country = CountryPicker.getAllCountries()
    .map(country => {
      console.log({country})
      return country
    })
    .find(country => country.cca2 === cca2)
  console.log(country)
  return { cca2, countryName: country.name.common, calling: country.callingCode }
}
