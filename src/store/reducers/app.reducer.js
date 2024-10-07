export const SET_MODAL_DATA = 'SET_MODAL_DATA'
export const SET_IS_LOADING = 'SET_IS_LOADING'
export const SET_CURRENT_WIDTH = 'SET_CURRENT_WIDTH'
export const SET_IS_WIDE_SCREEN = 'SET_IS_WIDE_SCREEN'
export const SET_IS_MOBILE = 'SET_IS_MOBILE'
export const SET_IS_SCROLLED = 'SET_IS_SCROLLED'
export const SET_IS_OPEN_AUTH_MODAL = 'SET_IS_OPEN_AUTH_MODAL'
export const SET_IS_OPEN_USER_MENU = 'SET_IS_OPEN_USER_MENU'


const initialState = {
	mobileBreakpoint: 550,
	narrowBreakpoint: 744,
	normalBreakpoint: 950,
	currentWidth: window.innerWidth,
	isMobile: window.innerWidth < 550,
	isWideScreen: window.innerWidth > 744,
	isScrolled: window.scrollY > 0,
	isLoading: true,
	modalData: null,
	isOpenAuthModal: false,
	isUserMenuOpen: false
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

		case SET_CURRENT_WIDTH:
			return {
				...state,
				currentWidth: cmd.currentWidth
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

		case SET_IS_OPEN_AUTH_MODAL:
			return {
				...state,
				isOpenAuthModal: cmd.isOpenAuthModal
			}

		case SET_IS_OPEN_USER_MENU:
			return {
				...state,
				isUserMenuOpen: cmd.isUserMenuOpen
			}

		default:
			return state
	}
}