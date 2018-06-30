const request = require('superagent')

const apiURL = 'http://api.population.io:80/1.0/population'

function getDetailedByCountryInYear(country, year, callback) {
  console.log(`Server side api fetching population data for ${country} in ${year}`);
  return request.get(`${apiURL}/${year}/${country}/`)
    .set('Content-Type', 'application/json')
    .then(res => {
      console.log('succes fetching data');
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

  const years = Array(end - start).fill(0)
                                      .map((el, i) => start + i)

  const data = {}

  return Promise.all(
    years.map(year => (
      getDetailedByCountryInYear(country, year, results => { addYearToData(year, results, data) }))
    )
  ).then(() => {
    return data
  })

  function addYearToData(year, results, data) {
    data[year] = results
  }
}

function getWorldPopulationRecordUntil(year) {
  return getTotalByCountryFromXUntilY('World', 1950, year)
}

function getTotalByCountryFromXUntilY(country, startString, endString) {
  return getDetailedByCountryFromXUntilY(country, startString, endString)
    .then(data => {
      return Object.keys(data).map(year => {
        return data[year].reduce((total, next) => total + Number(next.total), 0)
      })
    })
}

// getWorldPopulationRecordUntil(2000)
//   .then(results => {
//     console.log(results);
//   })


module.exports = {
  getDetailedByCountryInYear,
  getWorldPopulationRecordUntil,
  getDetailedByCountryFromXUntilY,
  getTotalByCountryFromXUntilY
}