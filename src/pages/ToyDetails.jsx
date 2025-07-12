import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { toyService } from '../services/toy.service.js'

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (toyId) loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then(setToy)
            .catch(err => {
                console.error('Could not load toy:', err)
                navigate('/toy')
            })
    }

    if (!toy) return <div>Loading toy details...</div>

    return (
        <section className="toy-details">
            <h1>{toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <img src={toy.imgUrl} alt={toy.name} style={{ maxWidth: '200px' }} />
            <p>In stock: {toy.inStock ? 'Yes' : 'No'}</p>
            <p>Labels: {toy.labels?.join(', ')}</p>
            <p>Created at: {new Date(toy.createdAt).toLocaleString()}</p>

            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp;|&nbsp;
            <Link to="/toy">Back</Link>
        </section>
    )
}
