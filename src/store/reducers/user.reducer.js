import { userService } from "../../services/user.service"

export const SPEND_BALANCE = 'SPEND_BALANCE'
export const SET_USER = 'SET_USER'
export const REMOVE_USER = 'REMOVE_USER'
export const SET_USERS = 'SET_USERS'

const initialState = {
    count: 0,
    user: userService.getLoggedinUser(),
    users: []
}


export function userReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case 'INCREMENT':
            return {
                ...state,
                count: state.count + 1
            }
        case 'CHANGE_BY':
            return {
                ...state,
                count: state.count + cmd.diff
            }

        case SPEND_BALANCE:
            const { user } = state
            return {
                ...state,
                user: { ...user, balance: user.balance - cmd.amount }
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