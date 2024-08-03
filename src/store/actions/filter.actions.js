import { store } from "../store"

import { SET_FILTER } from "../reducers/filter.reducer"


export function setFilterBy(fieldsToUpdate) {
    store.dispatch({ type: SET_FILTER, fieldsToUpdate })
}