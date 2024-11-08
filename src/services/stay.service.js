
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
    sanitizeFilterParams,
    calcGeneralScore,
    fetchImages
}
window.cs = stayService

_createStays()

// async function query(filterBy) {
//     let stays = await storageService.query(STORAGE_KEY)

//     if (filterBy) {
//         let { loc = '', checkIn = '', checkOut = '', who = 0, category_tag } = filterBy
//         const regexLoc = new RegExp(category_tag, 'i')
//         stays = stays.filter(stay => stay.property_category.some(category => regexLoc.test(category)));
//         // const regexLoc = new RegExp(loc, 'i')
//         // stays = stays.filter(stay => regexLoc.test(stay.property_category))
//         return stays
//     }

//     // if (filterBy.checkIn && filterBy.checkOut) {
//     //     // stays = stays.filter(stay => stay.price <= filterBy.price)
//     // }

//     return stays
// }

async function query(filterBy) {
    let stays = await storageService.query(STORAGE_KEY);

    if (filterBy) {
        let { loc = '', checkIn = '', checkOut = '', who = 0, category_tag = '' } = filterBy;

        if (loc) {
            const regexLoc = new RegExp(loc, 'i');
            stays = stays.filter(stay => regexLoc.test(stay.address.country));
            console.log(loc, stays);
        }

        if (category_tag) {
            const regexCategory = new RegExp(category_tag, 'i');
            stays = stays.filter(stay => stay.property_category.some(category => regexCategory.test(category)));
        }

        if (checkIn && checkOut) {
            const checkInDate = new Date(checkIn);
            const checkOutDate = new Date(checkOut);
            stays = stays.filter(stay => {
                const stayAvailableFrom = new Date(stay.availability.avalable_checkIn.$date)
                const stayAvailableTo = new Date(stay.availability.avalable_checkOut.$date);

                console.log(stayAvailableFrom, stayAvailableTo);
                
                return (
                    checkInDate >= stayAvailableFrom &&
                    checkOutDate <= stayAvailableTo
                );
            });
        }
    }

    return stays;
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
        category_tag: '',
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
        category_tag: '',
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

function calcGeneralScore(stay) {
    return Number.isInteger(stay.review_scores.review_scores_rating * 5 / 100)
        ? (stay.review_scores.review_scores_rating * 5 / 100).toFixed(1)
        : parseFloat((stay.review_scores.review_scores_rating * 5 / 100).toFixed(2))
}

// Private functions

async function _createStays() {
    const stays = await storageService.query(STORAGE_KEY)
    if (utilService.isArrayEmpty(stays)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DemoData))
    }
}

async function fetchImages() {
    return fetch("/public/images/filter-category/filter.json")
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            throw error;
        });
};
