export default function data(state = [], action) {
    switch (action.type) {
        case 'RECEIVED_DATA':
            return action.data
        case 'CLOSE_GRAPH':
            return []
        default:
            return state
    }
}
