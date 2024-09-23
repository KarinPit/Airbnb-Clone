
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'
import { dummyorders } from "./demo-data.js";

const STORAGE_KEY = 'order'
const STORAGE_KEY_CURRENT_ORDER = 'currentOrder'

export const orderService = {
    query,
    queryCurrentOrder,
    getById,
    save,
    saveCurrentOrder,
    remove,
    addorderMsg,
}
window.cs = orderService

_createOrders()
// _createCurrentzOrder()

async function query() {
    var orders = await storageService.query(STORAGE_KEY)
    return orders
}

async function queryCurrentOrder() {
    var currentOrder = await storageService.query(STORAGE_KEY_CURRENT_ORDER)
    return currentOrder
}

function getById(orderId) {
    return storageService.get(STORAGE_KEY, orderId)
}

async function remove(orderId) {
    // throw new Error('Nope')
    await storageService.remove(STORAGE_KEY, orderId)
}

async function save(order) {
    var savedorder
    if (order.id) {
        savedorder = await storageService.put(STORAGE_KEY, order)
    } else {
        // Later, owner is set by the backend
        order.owner = userService.getLoggedinUser()
        savedorder = await storageService.post(STORAGE_KEY, order)
    }
    return savedorder
}

async function saveCurrentOrder(order) {
    var savedorder
    savedorder = await storageService.post(STORAGE_KEY_CURRENT_ORDER, order)
    return savedorder
}

async function addorderMsg(orderId, txt) {
    // Later, this is all done by the backend
    const order = await getById(orderId)
    if (!order.msgs) order.msgs = []

    const msg = {
        id: utilService.makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    order.msgs.push(msg)
    await storageService.put(STORAGE_KEY, order)

    return msg
}

function _createOrders() {
    let orders = utilService.loadFromStorage(STORAGE_KEY);
    if (!orders || !orders.length) {
        orders = dummyorders;
        utilService.saveToStorage(STORAGE_KEY, orders);
    }
}
