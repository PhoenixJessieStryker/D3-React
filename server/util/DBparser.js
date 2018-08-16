function prepareForDB (parcel) {
  const data = {
    name: parcel.name
  }
  parcel.years.forEach(item => {
    data[item.year + ''] = item.population
  })
  return data
}

function parseFromDB (raw) {
  let data = []

  delete raw.id 
  delete raw.name

  Object.keys(raw).forEach(year => {
    data.push({
      year: Number(year),
      population: raw[year]
    })
  })

  return data
}

module.exports = {
  prepareForDB,
  parseFromDB
}