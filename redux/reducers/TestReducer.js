import { TEST_ACTION } from '../types'

const INITIAL_STATE = {
    message: '',
}

const TestReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEST_ACTION: {
            return {
                ...state,
                message: action.payload
            }
        }

        default:
            return state
    }
}

export default TestReducer
