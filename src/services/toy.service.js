import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const toyService = {
    query,
    save,
    remove,
    getById,
    createToy,
    getDefaultFilter,
    getFilterFromSearchParams,
    getToyLabels,
    getRandomToy
}

const STORAGE_KEY = 'toysDB'

_createToys()

const toyLabels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export function getToyLabels() {
    return toyLabels
}

async function query(filterBy) {
    try {
        let toysDB = await storageService.query(STORAGE_KEY)
        if (filterBy.sortBy) {
            const sortKey = filterBy.sortBy
            toysDB.sort((a, b) => {
                if (sortKey === 'name') return a.name.localeCompare(b.name)
                if (sortKey === 'price') return a.price - b.price
                if (sortKey === 'createdAt') return b.createdAt - a.createdAt
            })
        }
        return toysDB
    } catch (error) {
        console.log('error in query:', error)
        throw error
    }
}

function getById(_id) {
    return storageService.get(STORAGE_KEY, _id)
}

function remove(_id) {
    return storageService.remove(STORAGE_KEY, _id)
}

function save(toyToSave) {
    if (toyToSave._id) {
        return storageService.put(STORAGE_KEY, toyToSave)
    } else {
        toyToSave.isOn = false
        return storageService.post(STORAGE_KEY, toyToSave)
    }
}

function createToy(name = '', price = 0, labels = []) {
    const imgIdx = utilService.getRandomIntInclusive(1, 10)
    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt: Date.now(),
        inStock: true,
        imgUrl: `/img/${imgIdx}.JPG`, // relative to public/
    }
}



function getDefaultFilter() {
    return {
        txt: '',
        inStock: null, // All, true, or false
        labels: [],
        sortBy: '',
        maxPrice: 0
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
            {
                _id: 't101',
                name: 'Talking Doll',
                price: 123,
                labels: ['Doll', 'Battery Powered', 'Baby'],
                createdAt: Date.now(),
                inStock: true,
                imgUrl: `/img/${utilService.getRandomIntInclusive(1, 10)}.JPG`
            },
            {
                _id: 't102',
                name: 'Puzzle Mania',
                price: 80,
                labels: ['Puzzle', 'Box game'],
                createdAt: Date.now(),
                inStock: true,
                imgUrl: `/img/${utilService.getRandomIntInclusive(1, 10)}.JPG`
            },
            {
                _id: 't103',
                name: 'Art Attack Set',
                price: 150,
                labels: ['Art', 'Outdoor'],
                createdAt: Date.now(),
                inStock: false ,
                imgUrl: `/img/${utilService.getRandomIntInclusive(1, 10)}.JPG`
            },
            {
                _id: 't104',
                name: 'Baby Car',
                price: 200,
                labels: ['On wheels', 'Baby'],
                createdAt: Date.now(),
                inStock: true,
                imgUrl: `/img/${utilService.getRandomIntInclusive(1, 10)}.JPG`
            }
        ]
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function getRandomToy() {
    const randomNames = ['Buzz Lightyear', 'Rubik\'s Cube', 'Lego Car', 'Plush Bunny', 'Magic Marker']
    const randomLabels = toyLabels
    const name = utilService.getRandomToyName(randomNames)
    const price = utilService.getRandomIntInclusive(10, 300)
    const labels = utilService.getRandomItems(randomLabels, utilService.getRandomIntInclusive(1, 3))
    const imgUrl = `/img/${utilService.getRandomIntInclusive(1, 10)}.JPG`

    return {
        _id: utilService.makeId(),
        name,
        price,
        labels,
        imgUrl,
        createdAt: Date.now(),
        inStock: Math.random() > 0.3
    }
}



