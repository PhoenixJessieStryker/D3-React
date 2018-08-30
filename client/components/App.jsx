import React, { Component } from 'react'

import PopulationGraph from './PopulationGraph'
import GlobeSelector from './GlobeSelector'
import CountrySelect from './CountrySelect'

import { connect } from 'react-redux'

import { fetchGraph } from '../actions/data'
import { fetchJSONCountryList } from '../actions/countryList'

class App extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(fetchJSONCountryList())
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.country != this.props.country) this.props.dispatch(
      fetchGraph({
        country: this.props.country,
        start: 1950,
        end: 2018
      })
    )
  }

  graphDisplay(status) {
    switch (status) {
      case 'received':
        return <PopulationGraph />
      case 'fetching':
        return <h1 className='title'>Fetching Data</h1>
      case '' || 'none':
        return <h1 className='title'>No data to show</h1>
    }
  }

  render() {
    return (
      <div className='app-container section'>
        {this.props.fetchStatus.countries === 'received' &&
          <CountrySelect />
        }
        <div className='level'>
          <div className='level-item has-text-centered text-selector'>
            {this.props.fetchStatus.countries === 'received' &&
              <GlobeSelector />}
          </div>
        </div>
        <div className='level'>
          <div className='level-item has-text-centered'>
            {this.graphDisplay(this.props.fetchStatus.data)}
          </div>
        </div>
      </div>

    )
  }
}

const mapStateToProps = ({ country, fetchStatus }) => ({ country, fetchStatus })

export default connect(mapStateToProps)(App)
