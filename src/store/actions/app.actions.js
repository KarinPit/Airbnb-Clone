import { SET_MODAL_DATA } from "../reducers/app.reducer";
import { store } from "../store";


export function onToggleModal(modalData = null) {
	store.dispatch({
		type: SET_MODAL_DATA,
		modalData
	})
}