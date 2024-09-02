import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { userReducer } from './reducers/user.reducer'
import { appReducer } from './reducers/app.reducer'
import { filterReducer } from './reducers/filter.reducer'
import { stayReducer } from './reducers/stay.reducer'
import { orderReducer } from './reducers/order.reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const rootReducer = combineReducers({
    userModule: userReducer,
    appModule: appReducer,
    filterModule: filterReducer,
    stayModule: stayReducer,
    orderModule: orderReducer,
})

export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store