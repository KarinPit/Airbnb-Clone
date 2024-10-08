import { userService } from "../../services/user.service.js"

import { SET_CURRENT_LOCATION, REMOVE_USER, SET_USER, SET_USERS } from "../reducers/user.reducer.js"
import { SET_IS_LOADING } from "../reducers/app.reducer.js"

import { store } from "../store.js"


export async function loadUsers() {
    try {
        const users = await userService.getUsers()
        store.dispatch({ type: SET_USERS, users })
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function spendBalance(amount) {
    try {
        const user = await userService.changeBalance(amount)
        store.dispatch({
            type: SET_USER,
            user
        })
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({
            type: SET_USER,
            user
        })
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({
            type: SET_USER,
            user: null
        })
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function getUserLocation() {
    try {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords
                store.dispatch({ type: SET_CURRENT_LOCATION, currentLocation: { latitude: latitude, longitude: longitude } })
                store.dispatch({ type: SET_IS_LOADING, isLoading: false })
            })
        }
        else {
            throw 'Geolocation is not supported by this browser.'
        }
    }
    catch (err) {
        console.log('Cannot get current location', err);
    }
}