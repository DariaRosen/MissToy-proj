import { useState, useEffect, useRef } from 'react'
import { debounce } from '../services/util.service'
import { toyService } from '../services/toy.service.js'

export function ToyFilter({ filterBy, onSetFilter }) {
    const toyLabels = toyService.getToyLabels()

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(debounce(onSetFilter)).current

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { name: field, value, type } = target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prev => ({ ...prev, [field]: value }))
    }

    return (
        <section className="toy-filter">
            {/* <h2>Toy Filter</h2> */}
            <label htmlFor="labels">Labels:</label>
            <select
                id="labels"
                multiple
                value={filterByToEdit.labels || []}
                onChange={handleLabelSelect}
            >
                {labels.map(label => (
                    <option key={label} value={label}>
                        {label}
                    </option>
                ))}
            </select>
            <form>
                <label htmlFor="txt">Search by name:</label>
                <input
                    type="text"
                    id="txt"
                    name="txt"
                    placeholder="Search toys..."
                    value={filterByToEdit.txt || ''}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input
                    type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="Max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />
            </form>
            <label htmlFor="sortBy">Sort by:</label>
            <select
                id="sortBy"
                name="sortBy"
                value={filterByToEdit.sortBy}
                onChange={handleChange}
            >
                <option value="">None</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Created</option>
            </select>

        </section>
    )
}
