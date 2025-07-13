import { useEffect, useRef, useState } from "react"
import { toyService } from "../services/toy.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { useNavigate, useParams, Link } from "react-router-dom"
import { saveToy } from "../store/toy/toy.actions.js"

export function ToyEdit() {
    const navigate = useNavigate()
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const [isLoadingToy, setIsLoadingToy] = useState(false)
    const { toyId } = useParams()

    useEffect(() => {
        if (toyId) loadToy()
    }, [])

    function loadToy() {
        setIsLoadingToy(true)
        console.log('Loading toy with ID:', toyId)
        toyService.getById(toyId)
            .then(toy => setToyToEdit(toy))
            .catch(err => {
                console.log('Had issues in toy edit', err)
                navigate('/toy')
            })
            .finally(() => setIsLoadingToy(false))
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        
        
        ev.preventDefault()
        if (!toyToEdit.price) toyToEdit.price = 100
        console.log('toyToEdit', toyToEdit);
        saveToy(toyToEdit)
            .then(() => {
                showSuccessMsg('Toy Saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('Had issues saving toy', err)
                showErrorMsg('Had issues saving toy')
            })
    }

    const loadingClass = isLoadingToy ? 'loading-toy' : ''
    const { name, price, imgUrl, inStock } = toyToEdit

    return (
        <section className={`toy-edit ${loadingClass}`}>
            <h2>{toyId ? 'Edit' : 'Add'} Toy</h2>
            <form onSubmit={onSaveToy}>
                <label htmlFor="name">Name :</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter toy name..."
                    value={name}
                    onChange={handleChange}
                />

                <label htmlFor="price">Price :</label>
                <input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="Enter price"
                    value={price}
                    onChange={handleChange}
                />

                <label htmlFor="imgUrl">Image URL :</label>
                <input
                    type="text"
                    name="imgUrl"
                    id="imgUrl"
                    placeholder="Enter image URL"
                    value={imgUrl}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In Stock :</label>
                <select
                    name="inStock"
                    id="inStock"
                    value={inStock ? 'true' : 'false'}
                    onChange={handleChange}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>

                <div className="form-actions">
                    <button type="submit">{toyId ? 'Save' : 'Add'}</button>
                    <Link to="/toy" className="btn">Cancel</Link>
                </div>

            </form>
        </section>
    )
}
