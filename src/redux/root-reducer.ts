import { combineReducers } from "redux"
import userReducer from './user/slice'
import toolReducer from './tool/slice'

const RootReducer = combineReducers({ userReducer, toolReducer })

export default RootReducer