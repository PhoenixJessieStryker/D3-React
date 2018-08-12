const env = require('./test-environment')
const db = require('../../../server/db/population')

let testDb = null

beforeEach(() => {
  testDb = env.getTestDb()
  return env.initialise(testDb)
})

afterEach(() => env.cleanup(testDb))

describe('population database', () => {

  describe('checkExists', () => {

    it('returns true for existing country', () => {
      const country = 'New Zealand'

      return db.checkExists(country, testDb)
        .then(exists => {
          expect(exists).toBeTruthy()
        })
    })

    it('returns false for non-existent country', () => {
      const country = 'New Brad'

      return db.checkExists(country, testDb)
        .then(exists => {
          expect(exists).toBeFalsy()
        })
    })
  })

  describe('insertCountryData', () => {
    it ('succesfully injects', () => {
      const newData = {
        name: 'New Brad',
        years: {
          '1952': 3, 
          '1953': 4
        }
      }
  
      return db.insertCountryData(newData, testDb)
        .then(ids => {
          expect(typeof ids[0]).toEqual('number')
        })
    })
  })
})
