import React from 'react'

const Header = () => {
    return (
        <header className='header'>
            <h1 className='logo-card'>ChoreStream</h1>
            <nav className='header-nav'>
                <h5 className='nav-item'>Home</h5>
                <h5 className='nav-item'>How it Works</h5>
                <h5 className='nav-item'>Contact</h5>
                <button className='auth-button'>Login</button>
                <button className='auth-button'>Register</button>
            </nav>
        </header>
    )
}

export default Header
