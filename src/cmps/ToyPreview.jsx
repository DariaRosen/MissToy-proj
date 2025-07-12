import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">
            <h4>{toy.vendor}</h4>
            <img src={toy.imgUrl} alt={toy.name} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.name && <p>Name: {toy.name}</p>}
            <div className="actions">
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
                <span>|</span>
                <Link to={`/toy/${toy._id}`}>Details</Link>
                <span>|</span>
                <button onClick={() => onRemoveToy(toy._id)} title="Delete">×</button>
            </div>
        </article>
    )
}
