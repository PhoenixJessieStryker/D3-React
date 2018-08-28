const request = require('superagent')

const apiURL = 'http://api.population.io:80/1.0'

function getDetailedByCountryInYear(country, year, callback) {
  return request.get(`${apiURL}/population/${year}/${country}/`)
    .set('Content-Type', 'application/json')
    .then(res => {
      if (callback) callback(res.body)
      return res.body
    })
    .catch(err => {
      console.log('logging error', err);
    })
}

function getDetailedByCountryFromXUntilY(country, startString, endString) {
  const start = Number(startString)
  const end = Number(endString)

  if (end <= start) throw new Error('bad request, end before start');
  if (end > 2100 || start < 1950) throw new Error('outside year range')

  const years = Array(end - start + 1)
    .fill(0)
    .map((el, i) => start + i)

  const data = {}

  return Promise.all(
    years.map(year => (
      getDetailedByCountryInYear(country, year, results => { addYearToData(year, results, data) }))
    )
  )
  .then(() => data)

  function addYearToData(year, results, dataSet) {
    dataSet[year] = results
  }
}

function getWorldPopulationRecordUntil(year) {
  return getTotalByCountryFromXUntilY('World', 1950, year)
}

function getTotalByCountryFromXUntilY(country, startString, endString) {
  return getDetailedByCountryFromXUntilY(country, startString, endString)
    .then(rawData => {
      const listOfTotals = Object.keys(rawData).map(e => Number(e)).sort((a,b) => a - b)
        .map(year => {
          const yearlyTotal = rawData[year].reduce((total, next) => total + Number(next.total), 0)
          return { year, population: yearlyTotal }
        })
      return listOfTotals
    })
}

function getCountryList(callback) {
  return request.get(`${apiURL}/countries`)
    .set('Content-Type', 'application/json')
    .then(res => {
      if (callback) callback(res.body)
      return res.body
    })
}

module.exports = {
  getDetailedByCountryInYear,
  getWorldPopulationRecordUntil,
  getDetailedByCountryFromXUntilY,
  getTotalByCountryFromXUntilY,
  getCountryList
}
