import React from 'react'

const Header = () => {
    return (
        <header className='header'>
            <h1 className='logo-card'>ChoreStream</h1>
            <nav className='header-nav'>
                <ul className='nav-links'>
                    <li className='nav-item'>Home</li>
                    <li className='nav-item'>How it Works</li>
                    <li className='nav-item'>Contact</li>
                    <div className='button-container'>
                        <button className='auth-button'>Login</button>
                        <button className='auth-button'>Register</button>
                    </div>
                </ul>
            </nav>
        </header>
    )
}

export default Header
