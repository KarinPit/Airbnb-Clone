import { store } from "../store"
import { stayService } from "../../services/stay.service"

import { SET_STAYS } from "../reducers/stay.reducer"
import { SET_IS_LOADING } from "../reducers/app.reducer"

export async function loadStays() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    try {
        const { filterBy } = store.getState().filterModule
        const stays = await stayService.query(filterBy)
        store.dispatch({ type: SET_STAYS, stays })
    }
    catch (err) {
        console.log('Had issues loading stays', err)
        throw err
    }
    store.dispatch({ type: SET_IS_LOADING, isLoading: false })
}

