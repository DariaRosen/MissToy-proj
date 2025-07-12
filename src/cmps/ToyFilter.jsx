import { useState, useEffect, useRef } from 'react'
import { debounce } from '../services/util.service'
import { toyService } from '../services/toy.service' // make sure this is imported

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

    // ✅ Define handleLabelSelect
    function handleLabelSelect({ target }) {
        const selectedOptions = [...target.selectedOptions].map(opt => opt.value)
        setFilterByToEdit(prev => ({ ...prev, labels: selectedOptions }))
    }

    return (
        <section className="toy-filter">
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

                <label htmlFor="labels">Labels:</label>
                <select
                    id="labels"
                    multiple
                    value={filterByToEdit.labels || []}
                    onChange={handleLabelSelect}
                >
                    {toyLabels.map(label => (
                        <option key={label} value={label}>
                            {label}
                        </option>
                    ))}
                </select>
            </form>
        </section>
    )
}
