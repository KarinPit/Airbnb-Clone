import { store } from "../store"

import { SET_FILTER } from "../reducers/filter.reducer"
import { SET_OPEN_FILTER } from "../reducers/filter.reducer"


export function setFilterBy(fieldsToUpdate) {
    store.dispatch({ type: SET_FILTER, fieldsToUpdate })
}

export function changeFilterInput(filterInput) {
    store.dispatch({ type: SET_OPEN_FILTER, isOpenFilter: filterInput })
}