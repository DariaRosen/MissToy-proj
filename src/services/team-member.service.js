import PropTypes from 'prop-types'
import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

let gNextId = 101
const gTeamMembers = _createTeamMembers()

export const teamMemberService = {
    query,
}


async function query({ startIdx, amount = 10 }) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(gTeamMembers.slice(startIdx * amount, startIdx * amount + 10))
        }, 1000);
    })
}


function _createTeamMembers() {
    const teamMembers = [
        { id: gNextId++, name: "Alice", position: "Developer", age: 30 },
        { id: gNextId++, name: "Bob", position: "Designer", age: 28 },
        { id: gNextId++, name: "Charlie", position: "Manager", age: 35 },
        { id: gNextId++, name: "David", position: "Developer", age: 25 },
        { id: gNextId++, name: "Eva", position: "Designer", age: 26 },
        { id: gNextId++, name: "Frank", position: "Manager", age: 40 },
        { id: gNextId++, name: "Grace", position: "Developer", age: 32 },
        { id: gNextId++, name: "Henry", position: "Designer", age: 29 },
        { id: gNextId++, name: "Ivy", position: "Manager", age: 36 },
        { id: gNextId++, name: "Jack", position: "Developer", age: 27 },
        { id: gNextId++, name: "Kathy", position: "Designer", age: 30 },
        { id: gNextId++, name: "Leo", position: "Manager", age: 42 },
        { id: gNextId++, name: "Mia", position: "Developer", age: 31 },
        { id: gNextId++, name: "Nate", position: "Designer", age: 33 },
        { id: gNextId++, name: "Olivia", position: "Manager", age: 38 },
        { id: gNextId++, name: "Peter", position: "Developer", age: 24 },
        { id: gNextId++, name: "Quinn", position: "Designer", age: 27 },
        { id: gNextId++, name: "Rachel", position: "Manager", age: 41 },
        { id: gNextId++, name: "Sam", position: "Developer", age: 29 },
        { id: gNextId++, name: "Tina", position: "Designer", age: 35 },
        { id: gNextId++, name: "Ulysses", position: "Manager", age: 37 },
        { id: gNextId++, name: "Vera", position: "Developer", age: 28 },
        { id: gNextId++, name: "Will", position: "Designer", age: 34 },
        { id: gNextId++, name: "Xena", position: "Manager", age: 39 },
        { id: gNextId++, name: "Yuri", position: "Developer", age: 26 },
        { id: gNextId++, name: "Zoe", position: "Designer", age: 31 },
        { id: gNextId++, name: "Adam", position: "Manager", age: 33 },
        { id: gNextId++, name: "Bella", position: "Developer", age: 32 },
        { id: gNextId++, name: "Carl", position: "Designer", age: 30 },
        { id: gNextId++, name: "Diana", position: "Manager", age: 36 },
        { id: gNextId++, name: "Ethan", position: "Developer", age: 29 },
        { id: gNextId++, name: "Fiona", position: "Designer", age: 28 },
        { id: gNextId++, name: "George", position: "Manager", age: 40 },
        { id: gNextId++, name: "Hanna", position: "Developer", age: 26 },
        { id: gNextId++, name: "Ian", position: "Designer", age: 27 },
        { id: gNextId++, name: "Julia", position: "Manager", age: 38 },
        { id: gNextId++, name: "Kevin", position: "Developer", age: 25 },
        { id: gNextId++, name: "Lily", position: "Designer", age: 34 },
        { id: gNextId++, name: "Max", position: "Manager", age: 37 },
        { id: gNextId++, name: "Nora", position: "Developer", age: 30 },
        { id: gNextId++, name: "Oscar", position: "Designer", age: 33 },
        { id: gNextId++, name: "Pam", position: "Manager", age: 42 },
        { id: gNextId++, name: "Quincy", position: "Developer", age: 31 },
        { id: gNextId++, name: "Rita", position: "Designer", age: 29 },
        { id: gNextId++, name: "Steve", position: "Manager", age: 35 },
        { id: gNextId++, name: "Tara", position: "Developer", age: 32 },
        { id: gNextId++, name: "Umar", position: "Designer", age: 27 },
        { id: gNextId++, name: "Vicky", position: "Manager", age: 36 },
        { id: gNextId++, name: "Walt", position: "Developer", age: 28 },
        { id: gNextId++, name: "Xander", position: "Designer", age: 26 },
        { id: gNextId++, name: "Yasmin", position: "Developer", age: 29 },
        { id: gNextId++, name: "Zack", position: "Designer", age: 31 },
        { id: gNextId++, name: "Amelia", position: "Manager", age: 33 },
        { id: gNextId++, name: "Ben", position: "Developer", age: 34 },
        { id: gNextId++, name: "Cara", position: "Designer", age: 28 },
        { id: gNextId++, name: "Derek", position: "Manager", age: 37 },
        { id: gNextId++, name: "Elise", position: "Developer", age: 30 },
        { id: gNextId++, name: "Felix", position: "Designer", age: 32 },
        { id: gNextId++, name: "Gina", position: "Manager", age: 36 },
        { id: gNextId++, name: "Harold", position: "Developer", age: 27 },
        { id: gNextId++, name: "Irene", position: "Designer", age: 35 },
        { id: gNextId++, name: "Jason", position: "Manager", age: 40 },
        { id: gNextId++, name: "Kelly", position: "Developer", age: 29 },
        { id: gNextId++, name: "Luis", position: "Designer", age: 33 },
        { id: gNextId++, name: "Monica", position: "Manager", age: 38 },
        { id: gNextId++, name: "Nolan", position: "Developer", age: 31 },
        { id: gNextId++, name: "Olga", position: "Designer", age: 30 },
        { id: gNextId++, name: "Paul", position: "Manager", age: 42 },
        { id: gNextId++, name: "Queen", position: "Developer", age: 28 },
        { id: gNextId++, name: "Ron", position: "Designer", age: 26 },
        { id: gNextId++, name: "Sophie", position: "Manager", age: 39 },
        { id: gNextId++, name: "Tim", position: "Developer", age: 35 },
        { id: gNextId++, name: "Una", position: "Designer", age: 30 },
        { id: gNextId++, name: "Victor", position: "Manager", age: 37 },
        { id: gNextId++, name: "Wendy", position: "Developer", age: 27 },
        { id: gNextId++, name: "Xander", position: "Designer", age: 32 },
        { id: gNextId++, name: "Yasmine", position: "Manager", age: 33 },
        { id: gNextId++, name: "Zane", position: "Developer", age: 29 },
        { id: gNextId++, name: "Amos", position: "Designer", age: 31 },
        { id: gNextId++, name: "Bea", position: "Manager", age: 38 },
        { id: gNextId++, name: "Clint", position: "Developer", age: 34 },
        { id: gNextId++, name: "Alice", position: "Developer", age: 30 },
        { id: gNextId++, name: "Bob", position: "Designer", age: 28 },
        { id: gNextId++, name: "Charlie", position: "Manager", age: 35 },
        { id: gNextId++, name: "David", position: "Developer", age: 25 },
        { id: gNextId++, name: "Eva", position: "Designer", age: 26 },
        { id: gNextId++, name: "Frank", position: "Manager", age: 40 },
        { id: gNextId++, name: "Grace", position: "Developer", age: 32 },
        { id: gNextId++, name: "Henry", position: "Designer", age: 29 },
        { id: gNextId++, name: "Ivy", position: "Manager", age: 36 },
        { id: gNextId++, name: "Jack", position: "Developer", age: 27 },
        { id: gNextId++, name: "Kathy", position: "Designer", age: 30 },
        { id: gNextId++, name: "Leo", position: "Manager", age: 42 },
        { id: gNextId++, name: "Mia", position: "Developer", age: 31 },
        { id: gNextId++, name: "Nate", position: "Designer", age: 33 },
        { id: gNextId++, name: "Olivia", position: "Manager", age: 38 },
        { id: gNextId++, name: "Peter", position: "Developer", age: 24 },
    ];


    return teamMembers

}

