import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

export function AppHeader() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    return (
        <header className="app-header">
            <section className="container">
                <h1>Toys</h1>
                <nav className="main-nav">
                    <NavLink to='/'>Home</NavLink>
                    <NavLink to='/toy'>Toys</NavLink>
                </nav>
            </section>
            <section className="container">
                {user &&
                    <span className="user-info">
                        {user.imgUrl && <img src={user.imgUrl} />}
                        {user.fullname}
                        <span className="score">{user.balance?.toLocaleString()}</span>
                    </span>
                }
            </section>
        </header>
    )
}
