
import { storageService } from './async-storage.service'
import { userService } from './user.service'
import { utilService } from './util.service'

import { DemoData } from "./demo-data"


const STORAGE_KEY = 'stay'

export const stayService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter
}
window.cs = stayService

_createStays()

async function query(filterBy) {
    let stays = await storageService.query(STORAGE_KEY)
    if (filterBy) {
        let { location = '', checkIn = '', checkOut = '', who = 0 } = filterBy
        const regexLoc = new RegExp(location, 'i')
        stays = stays.filter(stay => regexLoc.test(stay.address.country))
        // console.log('returning stays', stays)
    }

    // if (filterBy.checkIn && filterBy.checkOut) {
    //     // stays = stays.filter(stay => stay.price <= filterBy.price)
    // }

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


function getDefaultFilter() {
    return {
        location: '',
        checkIn: '',
        checkOut: '',
        who: 0,
    }
}

// Private functions

async function _createStays() {
    const stays = await storageService.query(STORAGE_KEY)
    if (utilService.isArrayEmpty(stays)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DemoData))
    }
}

