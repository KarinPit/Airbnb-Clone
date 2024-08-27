
export const SET_STAYS = 'SET_STAYS'


const initialState = {
    stays: []
}

export function stayReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_STAYS:
            return {
                ...state,
                stays: cmd.stays
            }

        default:
            return state
    }
}
