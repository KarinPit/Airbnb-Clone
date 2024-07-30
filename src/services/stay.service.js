
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

import { DemoData } from "./demo-data"


const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove
}
window.cs = stayService


async function query(filterBy = { txt: '', price: 0 }) {
    var stays = await storageService.query(STORAGE_KEY)
    if (filterBy.txt) {
        const regex = new RegExp(filterBy.txt, 'i')
        stays = stays.filter(stay => regex.test(stay.vendor) || regex.test(stay.description))
    }
    if (filterBy.price) {
        stays = stays.filter(stay => stay.price <= filterBy.price)
    }

    stays = stays.map(({ _id, vendor, price, owner }) => ({ _id, vendor, price, owner }))
    return stays
}

function getById(stayId) {
    return storageService.get(STORAGE_KEY, stayId)
}

async function remove(stayId) {
    await storageService.remove(STORAGE_KEY, stayId)
}

async function save(stay) {
    var savedStay
    if (stay._id) {
        const stayToSave = {
            _id: stay._id,
            price: stay.price
        }
        savedStay = await storageService.put(STORAGE_KEY, stayToSave)
    } else {
        const stayToSave = {
            vendor: stay.vendor,
            price: stay.price,
            owner: userService.getLoggedinUser(),
            msgs: []
        }
        savedStay = await storageService.post(STORAGE_KEY, stayToSave)
    }
    return savedStay
}

// Private functions

async function _loadData() {
    const stays = await storageService.query(STORAGE_KEY)
    if (utilService.isArrayEmpty(stays)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DemoData))
    }
}

_loadData()