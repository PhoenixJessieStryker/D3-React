export const initialState = {
  countries: '',
  data: ''
}

export default function data(state = initialState, action) {
    switch (action.type) {
        case 'REQUEST_COUNTRIES':
            return {
              data: state.data,
              countries: 'fetching'
            }
        case 'RECEIVED_COUNTRIES':
            return {
              data: state.data,
              countries: 'received'
            }
        case 'REQUEST_DATA':
            return {
              data: 'fetching',
              countries: state.countries
            }
        case 'RECEIVED_DATA':
            return {
              data: 'received',
              countries: state.countries
            }
        case 'NO_DATA':
            return {
              data: 'none',
              countries: state.countries
            }
        case 'CLOSE_GRAPH':
          return {
            data: '',
            countries: state.countries
          }
        default:
            return state
    }
}
