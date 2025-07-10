import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'toys'

_createToys()

async function query(filterBy) {
    try {
        let toys = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let { minBatteryStatus, model = '', type = '' } = filterBy
            minBatteryStatus = minBatteryStatus || 0
            toys = toys.filter(toy =>
                toy.type.toLowerCase().includes(type.toLowerCase()) &&
                toy.model.toLowerCase().includes(model.toLowerCase()) &&
                toy.batteryStatus >= minBatteryStatus
            )
        }
        return toys
    } catch (error) {
        console.log('error:', error)
        throw error
    }
}

function getById(id) {
    return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
    return storageService.remove(STORAGE_KEY, id)
}

function save(toyToSave) {
    if (toyToSave.id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        toyToSave.isOn = false
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function createToy(model = '', type = '', batteryStatus = 100) {
    return {
        model,
        batteryStatus,
        type
    }
}

function getDefaultFilter() {
    return {
        type: '',
        minBatteryStatus: 0,
        model: ''
    }
}


function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys || !toys.length) {
        toys = [
            { id: 'r1', model: 'Dominique Sote', batteryStatus: 100, type: 'Pleasure' },
            { id: 'r2', model: 'Salad-O-Matic', batteryStatus: 80, type: 'Cooking' },
            { id: 'r3', model: 'Dusty', batteryStatus: 100, type: 'Cleaning' },
            { id: 'r4', model: 'DevTron', batteryStatus: 40, type: 'Office' }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}




