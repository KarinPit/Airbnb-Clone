import { store } from "../store"

import { ADD_WISH, SET_WISHES, REMOVE_WISH, SET_STAYS } from "../reducers/stay.reducer"
import { SET_IS_LOADING } from "../reducers/app.reducer"
import { stayService } from "../../services/stay.service"
import { storageService } from "../../services/async-storage.service"


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

export async function loadWishes() {
    try {
        const wishlist = await storageService.query("wishlist")
        store.dispatch({ type: SET_WISHES, wishlist })
    } catch (err) {
        console.log('Had issues setting the wishes', err)
        throw err
    }
}

export async function addWish(stayId) {
    try {
        await storageService.postWish('wishlist', stayId)
        store.dispatch({ type: ADD_WISH, wish: stayId })
    } catch (err) {
        console.log('Had issues adding wish', err)
        throw err
    }
}

export async function removeWish(stayId) {
    try {
        await storageService.removeWish('wishlist', stayId)
        store.dispatch({ type: REMOVE_WISH, wish: stayId })
    } catch (err) {
        console.log('Had issues removing wish', err)
        throw err
    }
}