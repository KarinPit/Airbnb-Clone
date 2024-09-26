import { stayService } from "../../services/stay.service"

export const SET_FILTER = 'SET_FILTER'
export const SET_OPEN_FILTER = 'SET_OPEN_FILTER'
export const SET_OPEN_FILTER_MOBILE = 'SET_OPEN_FILTER_MOBILE'
export const SET_EXPANDED_FILTER = 'SET_EXPANDED_FILTER'
export const SET_OPEN_MODAL = 'SET_OPEN_MODAL'


const initialState = {
    filterBy: stayService.getDefaultFilter(),
    isOpenFilter: false,
    isOpenFilterMobile: false,
    isOpenModal: false,
    isExpandedFilter: false,
    defaultFilter: 'where-input-mobile',
}

export function filterReducer(state = initialState, cmd = {}) {
    switch (cmd.type) {
        case SET_FILTER:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...cmd.fieldsToUpdate }
            }

        case SET_OPEN_FILTER:
            return {
                ...state,
                isOpenFilter: cmd.isOpenFilter
            }

        case SET_OPEN_FILTER_MOBILE:
            return {
                ...state,
                isOpenFilterMobile: cmd.isOpenFilterMobile
            }

        case SET_OPEN_MODAL:
            return {
                ...state,
                isOpenModal: cmd.isOpenModal
            }

        case SET_EXPANDED_FILTER:
            return {
                ...state,
                isExpandedFilter: cmd.isExpandedFilter
            }

        default:
            return state
    }
}
