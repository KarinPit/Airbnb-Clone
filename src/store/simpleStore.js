
import { legacy_createStore as createStore } from 'redux'


const initialState = {
	count: 101,
	user: {},
	robots: null
}

function appReducer(state = initialState, cmd) {
	console.log('cmd', cmd)

	switch (cmd.type) {
		case 'SET_ROBOTS':
			return { ...state, robots: cmd.robots }


		case 'INCREMENT':
			return { ...state, count: state.count + 1 }
		case 'CHANGE_BY':
			return { ...state, count: state.count + cmd.diff }
		default: return state
	}
}

export const store = createStore(appReducer)

window.store = store
// console.log('store', store)

store.subscribe(() => {
	// console.log('Current state is:', store.getState())
})

// setInterval(() => {
// 	store.dispatch({ type: 'INCREMENT' })
// }, 1000)
// store.dispatch({ type: 'INCREMENT' })
// store.dispatch({ type: 'CHANGE_BY', diff: 20 })

