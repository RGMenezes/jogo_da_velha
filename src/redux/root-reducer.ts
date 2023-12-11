import { combineReducers } from "redux"
import userReducer from './user/slice'

const RootReducer = combineReducers({ userReducer })

export default RootReducer