// reducers/order.reducer.js


export const SET_ORDERS = "SET_ORDERS";
export const ADD_ORDER = "ADD_ORDER";
export const UPDATE_ORDER = "UPDATE_ORDER";
export const REMOVE_ORDER = "REMOVE_ORDER";
export const SET_FILTER_BY = "SET_FILTER_BY";
export const SET_IS_LOADING = "SET_IS_LOADING";
export const GET_TOTAL_ORDERS_FILTERED = "GET_TOTAL_ORDERS_FILTERED";
export const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";

const initialState = {
    orders: [],
    isLoading: true,
    totalFiltered: 0,
}

export function orderReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ORDERS:
            return { ...state, orders: action.orders };

        case ADD_ORDER:
            return { ...state, orders: [...state.orders, action.order] };

        case UPDATE_ORDER:
            const updatedOrders = state.orders.map(order =>
                order._id === action.order._id ? action.order : order
            );
            return { ...state, orders: updatedOrders };

        case REMOVE_ORDER:
            return {
                ...state,
                orders: state.orders.filter((order) => order._id !== action.orderId),
            };

        case SET_CURRENT_ORDER:
            return {
                ...state,
                currentOrder: action.order,
            };

        case SET_FILTER_BY:
            return {
                ...state,
                filterBy: { ...state.filterBy, ...action.fieldsToUpdate },
            };

        case GET_TOTAL_ORDERS_FILTERED:
            return {
                ...state,
                totalFiltered: action.total,
            };

        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            };

        default:
            return state;
    }
}
