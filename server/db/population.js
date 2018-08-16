const conn = require('./connection')
const {prepareForDB,parseFromDB} = require('../util/DBparser')

function getAvailableDataForCountry (name, testDb) {
  const db = testDb || conn
  return db('population')
    .where({name})
    .first()
    .then(results => parseFromDB(results))
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
    .update(prepareForDB(parcel))
}

function insertCountryData (parcel, testDb) {
  const db = testDb || conn
  return db('population')
    .insert(prepareForDB(parcel))
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
