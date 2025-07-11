import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { lazy, Suspense, useState } from 'react';

import 'animate.css';
import './assets/css/index.scss'

import { ToyEdit } from './pages/ToyEdit'
import { ToyIndex } from './pages/ToyIndex'
import { ToyDetails } from './pages/ToyDetails'
import { Home } from './pages/Home'

function App() {


    return (
        <Router>
            <section className='main-app'>
                <main className='container'>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/toy" element={<ToyIndex />} >
                            <Route path='/toy/edit/:toyId?' element={<ToyEdit />} />
                        </Route>
                        <Route path="/toy/:toyId" element={<ToyDetails />} />
                    </Routes>
                </main>
            </section>
        </Router>
    )
}

export default App
