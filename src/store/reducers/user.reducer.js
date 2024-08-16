import { userService } from "../../services/user.service"

export const SET_CURRENT_LOCATION = 'SET_CURRENT_LOCATION'
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    currentLocation: null,
    user: userService.getLoggedinUser(),
    users: []
}


export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: cmd.currentLocation
            }
        case SET_USER:
            return { ...state, user: cmd.user }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== cmd.userId)
            }
        case SET_USERS:
            return { ...state, users: cmd.users }
        default:
            return state
    }
}