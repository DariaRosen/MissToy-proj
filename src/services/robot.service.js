import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const robotService = {
    query,
    save,
    remove,
    getById,
    createRobot,
    getDefaultFilter,
    getFilterFromSearchParams
}

const STORAGE_KEY = 'robots'

_createRobots()

async function query(filterBy) {
    try {
        let robots = await storageService.query(STORAGE_KEY)
        if (filterBy) {
            let { minBatteryStatus, model = '', type = '' } = filterBy
            minBatteryStatus = minBatteryStatus || 0
            robots = robots.filter(robot =>
                robot.type.toLowerCase().includes(type.toLowerCase()) &&
                robot.model.toLowerCase().includes(model.toLowerCase()) &&
                robot.batteryStatus >= minBatteryStatus
            )
        }
        return robots
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

function save(robotToSave) {
    if (robotToSave.id) {
        return storageService.put(STORAGE_KEY, robotToSave)
    } else {
        robotToSave.isOn = false
        return storageService.post(STORAGE_KEY, robotToSave)
    }
}

function createRobot(model = '', type = '', batteryStatus = 100) {
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

function _createRobots() {
    let robots = utilService.loadFromStorage(STORAGE_KEY)
    if (!robots || !robots.length) {
        robots = [
            { id: 'r1', model: 'Dominique Sote', batteryStatus: 100, type: 'Pleasure' },
            { id: 'r2', model: 'Salad-O-Matic', batteryStatus: 80, type: 'Cooking' },
            { id: 'r3', model: 'Dusty', batteryStatus: 100, type: 'Cleaning' },
            { id: 'r4', model: 'DevTron', batteryStatus: 40, type: 'Office' }
        ]
        utilService.saveToStorage(STORAGE_KEY, robots)
    }
}




