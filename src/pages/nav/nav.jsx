import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'
import {supabase} from '../../client'
import './nav.css'

function Navbar(){

    const showSidebar = () => {
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'flex'
    }

    const hideSidebar = () => {
        const sidebar = document.querySelector('.sidebar')
        sidebar.style.display = 'none'
    }
    return (
        <div>                
            <nav>
                <ul className='sidebar'>
                        <li onClick={hideSidebar}><a><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="26px" fill="#333"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></a></li>
                        <li><Link to="/" className='title'>THE ART GARDEN</Link></li>
                        <li><Link to="/create">Create</Link></li>
                    </ul>
                    <ul>
                        <li><Link to="/" className='title'>THE ART GARDEN</Link></li>
                        <li><Link to="/create" className='text'>CREATE</Link></li>
                        <li onClick={showSidebar}><a><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="26px" fill="#333"><path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/></svg></a></li>
                    </ul>
                </nav>
        </div>
    )
}

export default Navbar