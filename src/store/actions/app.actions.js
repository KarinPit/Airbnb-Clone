import { SET_MODAL_DATA, SET_CURRENT_WIDTH, SET_IS_WIDE_SCREEN, SET_IS_MOBILE, SET_IS_SCROLLED } from "../reducers/app.reducer"
import { SET_EXPANDED_FILTER, SET_OPEN_FILTER, SET_OPEN_FILTER_MOBILE } from "../reducers/filter.reducer"
import { store } from "../store"


export function onToggleModal(modalData = null) {
	store.dispatch({
		type: SET_MODAL_DATA,
		modalData
	})
}

export function handleResize() {
	const newIsWideScreen = window.innerWidth > store.getState().appModule.narrowBreakpoint
	store.dispatch({ type: SET_CURRENT_WIDTH, currentWidth: window.innerWidth })

	if (newIsWideScreen) {
		store.dispatch({ type: SET_IS_WIDE_SCREEN, isWideScreen: true })
		store.dispatch({ type: SET_IS_MOBILE, isMobile: false })
		store.dispatch({ type: SET_OPEN_FILTER_MOBILE, isOpenFilter: false })
	} else {
		store.dispatch({ type: SET_IS_WIDE_SCREEN, isWideScreen: false })
		store.dispatch({ type: SET_IS_MOBILE, isMobile: true })
		store.dispatch({ type: SET_OPEN_FILTER, isOpenFilter: false })
	}
}

export function handleScroll() {
	if (window.scrollY > 0) {
		store.dispatch({ type: SET_IS_SCROLLED, isScrolled: true })
		store.dispatch({ type: SET_EXPANDED_FILTER, isExpandedFilter: false })
	}
	else {
		store.dispatch({ type: SET_IS_SCROLLED, isScrolled: false })
		store.dispatch({ type: 'SET_EXPANDED_FILTER', isExpandedFilter: true })
	}
}