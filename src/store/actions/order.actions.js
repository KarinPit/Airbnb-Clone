// actions/order.actions.js

import { orderService } from "../../services/order.service.js";
// import { orderService } from "../../services/order/order.service.local";
import { store } from "../store.js";

// import { showErrorMsg } from "../../services/other/event-bus.service.js";

import {
    SET_ORDERS,
    REMOVE_ORDER,
    SET_FILTER_BY,
    ADD_ORDER,
    UPDATE_ORDER,
    SET_IS_LOADING,
    GET_TOTAL_ORDERS_FILTERED,
    SET_CURRENT_ORDER
} from "../reducers/order.reducer.js";

export async function loadOrders(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    try {
        const orders = await orderService.query(filterBy);
        store.dispatch({ type: SET_ORDERS, orders });
    } catch (err) {
        console.error("OrderActions: err in loadOrders", err);
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}

export async function loadCurrentOrder() {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    try {
        const currentOrder = await orderService.queryCurrentOrder();
        store.dispatch({ type: SET_CURRENT_ORDER, currentOrder });
    } catch (err) {
        console.error("CurrentOrderActions: err in loadCurrentOrder", err);
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false });
    }
}

export async function removeOrder(orderId) {
    try {
        await orderService.remove(orderId);
        store.dispatch({ type: REMOVE_ORDER, orderId });
    } catch (err) {
        console.error("OrderActions: err in removeOrder", err);
    }
}

export function getActionUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order
    }
}

export function updateOrder(order) {
    return orderService.save(order)
        .then(savedOrder => {
            console.log('saving order');
            store.dispatch(getActionUpdateOrder(savedOrder));
            return savedOrder;
        })
        .catch(err => {
            console.log('Cannot save order', err);
            throw err;
        });
}

export function updateCurrentOrder(order) {
    localStorage.setItem("currentOrder", JSON.stringify(order));
    store.dispatch({ type: SET_CURRENT_ORDER, order });
    // return orderService.saveCurrentOrder(order)
    //     .then(savedOrder => {
    //         return savedOrder;
    //     })
    //     .catch(err => {
    //         console.log('Cannot save order', err);
    //         throw err;
    //     });
}

export async function saveOrder(order) {
    try {
        console.log(order._id);
        const type = order._id ? UPDATE_ORDER : ADD_ORDER;
        const savedOrder = await orderService.save(order);
        store.dispatch({ type, order: savedOrder });
    } catch (err) {
        console.error("Had issues saving orders", err);
        throw err;
    }
}

export async function loadOrder(orderId) {
    try {
        const order = await orderService.getById(orderId);
        store.dispatch({ type: ADD_ORDER, order });
    } catch (err) {
        showErrorMsg("Cannot load order");
        console.error("Cannot load order", err);
    }
}

export function setFilterBy(fieldsToUpdate) {
    store.dispatch({ type: SET_FILTER_BY, fieldsToUpdate });
}

export async function getTotalOrdersFiltered(filterBy) {
    const total = await orderService.getTotalFiltered(filterBy);
    store.dispatch({ type: GET_TOTAL_ORDERS_FILTERED, total });
}
