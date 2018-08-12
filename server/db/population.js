const conn = require('./connection')

function getAvailableDataForCountry (name, testDb) {
  const db = testDb || conn
  return db('population')
    .where({name})
}

function injectData (parcel, testDb) {
  const db = testDb || conn
  return checkExists(parcel.name, db)
    .then(exists => {
      return (exists)
      ? updateCountryData(parcel, db)
      : insertCountryData(parcel, db)
    })
}

function updateCountryData (parcel, testDb) {
  const db = testDb || conn
  return db('population')
    .where({name: parcel.name})
    .update(parcel.years)
}

function insertCountryData (parcel, testDb) {
  const db = testDb || conn
  return db('population')
    .insert({
      name: parcel.name,
      ...parcel.years
    })
}

function checkExists (name, testDb) {
  const db = testDb || conn
  return db('population')
    .where({name})
    .first()
    .then(result => !!result)
}

module.exports = {
  getAvailableDataForCountry,
  injectData,
  checkExists,
  insertCountryData,
  updateCountryData
}
