import { useEffect, useRef, useState } from "react"
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { useSelector } from "react-redux";
import { loadToys, removeToy, setFilterBy, saveToy } from "../store/toy/toy.actions";
import { toyService } from "../services/toy.service";


export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    // const filterBy = useSelector(storeState => storeState.toyModule.filterBy)

    const [filterBy, setFilterBy] = useState(toyService.getDefaultFilter())

    useEffect(() => {
        loadToys(filterBy)
            .then(toys => {
                showSuccessMsg('Load toys successfully')
            })
            .catch(err => {
                showErrorMsg('Cannot load toys')
            })
    }, [filterBy])

    function onSetFilter(filterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }


    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed successfully!')
        } catch (error) {
            showErrorMsg(`Having issues removing toy (${toyId})`)
        }
    }

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    function onAddToy() {
        const toyToSave = toyService.getRandomToy()
        console.log('toyToSave', toyToSave)
        // TODO: move to a function and use dispatch/action
        saveToy(toyToSave)
            .then((savedToy) => {
                showSuccessMsg(`Toy added (id: ${savedToy._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add toy')
            })
    }

    function onEditToy() {
        showSuccessMsg('Toy edited successfully!')
    }

    if (!toys) return <div>Loading...</div>

    const { model, minBatteryStatus, type } = filterBy
    return (
        <section className="toy-index">
            <hr />
            <h1>Welcome! this is our toys</h1>
            <hr />
            <main>
                <section>
                    <Link to="/toy/edit" className="add-btn">Add New Toy</Link>
                </section>
                <hr />
                <ToyFilter filterBy={filterBy} onSetFilter={onSetFilter} />

                <hr />
                {!!toys
                    ? <ToyList
                        toys={toys}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToToys={onAddToy}
                    />
                    : <div>Loading..</div>
                }
            </main>
            <Outlet />
        </section>
    )
}