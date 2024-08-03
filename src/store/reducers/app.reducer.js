export const SET_MODAL_DATA = 'SET_MODAL_DATA'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_IS_WIDE_SCREEN = 'SET_IS_WIDE_SCREEN'
export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_IS_SCROLLED = 'SET_IS_SCROLLED'


const initialState = {
	mobileBreakpoint: 550,
	narrowBreakpoint: 744,
	normalBreakpoint: 950,
	isMobile: false,
	isWideScreen: false,
	isScrolled: false,
	isLoading: true,
	modalData: null,
}

export function appReducer(state = initialState, cmd = {}) {
	switch (cmd.type) {
		case SET_MODAL_DATA:
			return {
				...state,
				modalData: cmd.modalData
			}

		case SET_IS_LOADING:
			return {
				...state,
				isLoading: cmd.isLoading
			}

		case SET_IS_WIDE_SCREEN:
			return {
				...state,
				isWideScreen: cmd.isWideScreen
			}

		case SET_IS_MOBILE:
			return {
				...state,
				isMobile: cmd.isMobile
			}

		case SET_IS_SCROLLED:
			return {
				...state,
				isScrolled: cmd.isScrolled
			}

		default:
			return state
	}
}