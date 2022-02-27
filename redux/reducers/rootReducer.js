import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import StoreReducer from './StoreReducer'

const reducers = combineReducers({
    auth: AuthReducer,
    stores: StoreReducer,
})

export default reducers
