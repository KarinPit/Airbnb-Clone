import { orderService } from "../../services/order.service.js";
import { store } from "../store.js";


import {
    SET_ORDERS,
    REMOVE_ORDER,
    ADD_ORDER,
    UPDATE_ORDER,

} from "../reducers/order.reducer.js";

export async function loadOrders(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true });
    try {
        const orders = await orderService.query();
        store.dispatch({ type: SET_ORDERS, orders });
    } catch (err) {
        console.error("OrderActions: err in loadOrders", err);
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

export async function updateOrder(order) {
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

export function getActionUpdateOrder(order) {
    return {
        type: UPDATE_ORDER,
        order
    }
}


export async function saveOrder(order) {
    try {
        const type = order._id ? UPDATE_ORDER : ADD_ORDER;
        const savedOrder = await orderService.save(order);
        store.dispatch({ type, order: savedOrder });
    } catch (err) {
        console.error("Had issues saving orders", err);
        throw err;
    }
}

