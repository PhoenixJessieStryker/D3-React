const db = require('../db/population')
const api = require('../apis/population')

function fetchAndInjectAll(country, start, end) {
  return api.getTotalByCountryFromXUntilY(country, start, end)
    .then(data => {
      return db.injectData({
        name: country,
        years: data
      }).then(() => data)
    })
}

function fetchAndInjectMissing(country, data, start, end) {
  const availableYears = data.map(item => item.year)
    .sort((a,b) => Number(a) - Number(b))

  const firstLaterYear = Number(availableYears[availableYears.length - 1]) + 1
  const lastPriorYear = Number(availableYears[0]) - 1
  
  let addingData = Promise.resolve(data)

  if (firstLaterYear <= Number(end)) {
    addingData = addingData.then(() => {
      return api.getTotalByCountryFromXUntilY(country, firstLaterYear, end)
        .then(newData => {
          newData.forEach(year => {
            data.push(year)
          })
          return db.injectData({
            name: country,
            years: newData
          })
        })
    })
  }

  if (lastPriorYear >= Number(start)) {
    addingData = addingData.then(() => {
      return api.getTotalByCountryFromXUntilY(country, start, lastPriorYear)
        .then(newData => {
          newData.forEach(year => {
            data.push(year)
          })
          return db.injectData({
            name: country,
            years: newData
          })
        })
    })
  }

  return addingData.then(() => {
    data = data.filter(item => {
      const {year} = item
      return Number(year) <= Number(end) && Number(year) >= Number(start)
    })
    return data
  })
}

module.exports = {
  fetchAndInjectAll,
  fetchAndInjectMissing
}