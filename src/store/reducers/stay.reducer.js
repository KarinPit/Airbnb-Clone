
export const SET_STAYS = 'SET_STAYS'
export const SET_WISHES = 'SET_WISHES'
export const ADD_WISH = 'ADD_WISH'
export const REMOVE_WISH = 'REMOVE_WISH'


const initialState = {
    stays: [],
    wishlist: []
}

export function stayReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_STAYS:
            return {
                ...state,
                stays: cmd.stays
            }

        case SET_WISHES:
            return {
                ...state,
                wishlist: cmd.wishlist
            }

        case ADD_WISH:
            return {
                ...state,
                wishlist: [...state.wishlist, cmd.wish]
            }

        case REMOVE_WISH:
            return {
                ...state,
                wishlist: state.wishlist.filter(wish => wish !== cmd.wish)
            }

        default:
            return state
    }
}
