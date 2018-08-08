import {combineReducers} from 'redux'

import country from './country'
import popData from './popdata'
import fetchStatus from './fetchStatus'
import countryList from './countryList'

export default combineReducers({
  country,
  countryList,
  popData,
  fetchStatus
})
