import React, {Component} from 'react'
import {connect} from 'react-redux'

import {selectCountryAction} from '../actions/country'

const CountrySelect = props => (
  <select className='globe-select-2' name='countries' onChange={props.onChangeCountry}>
    {props.countryList.map(country => (
      <option key={country.id} value={country.id}>{country.name}</option>
    ))}
  </select>
)

const mapStateToProps = ({countryList, country}) => ({countryList, country})

const mapDispatchToProps = dispatch => ({
  onChangeCountry: e => dispatch(selectCountryAction(e.target.options[e.target.selectedIndex].text))
})

export default connect(mapStateToProps, mapDispatchToProps)(CountrySelect)
