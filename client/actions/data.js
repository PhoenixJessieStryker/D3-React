import { getTotalByCountryFromXUntilY } from '../apis/population'
import getAPIName from '../util/countryDict'

function receiveDataAction(data) {
  return {
    type: 'RECEIVED_DATA',
    data
  }
}

function requestDataAction() {
  return {
    type: 'REQUEST_DATA',
  }
}

function failedDataAction() {
  return {
    type: 'NO_DATA'
  }
}

export function fetchGraph(selection) {
  return dispatch => {
    dispatch(requestDataAction())
    const { start, end } = selection
    const country = getAPIName(selection.country)
    if (country) {
      getTotalByCountryFromXUntilY(country, start, end)
        .then(data => {
          console.log('success fetching data', data[0]);
          dispatch(receiveDataAction(data))
        })
        .catch(err => {
          dispatch(failedDataAction())
          throw err
        })
    } else dispatch(failedDataAction())
  }
}
