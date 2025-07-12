import { Link } from 'react-router-dom'

export function ToyPreview({ toy }) {
console.log('ToyPreview toy :', toy);
    return (
        <article>
            <h4>{toy.vendor}</h4>
            {/* <h1>⛐</h1> */}
            <img src={toy.imgUrl} alt={toy.name} />
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.name && <p>Name: {toy.name}</p>}
            <hr />
            <Link to={`/toy/edit/${toy._id}`}>Edit</Link> &nbsp; | &nbsp;
            <Link to={`/toy/${toy._id}`}>Details</Link>
        </article>
    )
}
