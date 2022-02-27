import { combineReducers } from 'redux'
import TestReducer from './testReducer'

const reducers = combineReducers({
    test: TestReducer,
})

export default reducers
