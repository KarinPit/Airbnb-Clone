
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
    getDefaultFilter,
    getFilterFromParams,
    sanitizeFilterParams
}
window.cs = stayService

_createStays()

async function query(filterBy) {
    let stays = await storageService.query(STORAGE_KEY)

    if (filterBy) {
        let { loc = '', checkIn = '', checkOut = '', who = 0 } = filterBy
        const regexLoc = new RegExp(loc, 'i')
        stays = stays.filter(stay => regexLoc.test(stay.address.country))
        return stays
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
        loc: '',
        checkIn: '',
        checkOut: '',
        who: { totalCount: 0, adults: 0, children: 0, infants: 0, pets: 0 },
    };
}

function getFilterFromParams(searchParams) {
    const defaultFilter = getDefaultFilter();
    const filterBy = {};

    for (const field in defaultFilter) {
        if (field === 'who') {
            const whoFilter = {};
            for (const key in defaultFilter['who']) {
                const value = +searchParams.get(key)
                whoFilter[key] = value || defaultFilter['who'][key]
            }
            filterBy[field] = whoFilter;
        } else {
            filterBy[field] = searchParams.get(field) || defaultFilter[field];
        }
    }
    return filterBy;
}

function sanitizeFilterParams(filterBy) {
    const defaultFilter = {
        loc: '',
        checkIn: '',
        checkOut: '',
        who: { totalCount: 0, adults: 0, children: 0, infants: 0, pets: 0 },
    };

    const sanitizedFilter = Object.keys(filterBy)
        .filter((key) => key in defaultFilter && key !== 'who' && filterBy[key])
        .reduce((acc, currentVal) => {
            acc[currentVal] = filterBy[currentVal];
            return acc;
        }, {});

    if (filterBy.who) {
        Object.keys(filterBy.who).forEach((key) => {
            if (filterBy.who[key] > 0) {
                sanitizedFilter[key] = filterBy.who[key];
            }
        })
    }

    return sanitizedFilter;
}

// Private functions

async function _createStays() {
    const stays = await storageService.query(STORAGE_KEY)
    if (utilService.isArrayEmpty(stays)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DemoData))
    }
}

