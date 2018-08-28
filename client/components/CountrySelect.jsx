import React from 'react'
import {connect} from 'react-redux'

import Select from 'react-select'

import {selectCountryAction} from '../actions/country'

const CountrySelect = props => (
  <Select
    value={optionFromString(props.country)}
    onChange={props.onChangeCountry}
    options={props.countryList.map(country => optionFromString(country.name))}
  />
)

function optionFromString (country) {
  return { 
    value: country, 
    label: country
  }
}

const mapStateToProps = ({countryList, country}) => ({countryList, country})

const mapDispatchToProps = dispatch => ({
  onChangeCountry: selected => dispatch(selectCountryAction(selected.label))
})

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect)
