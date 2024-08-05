import React from 'react'
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
    <div className='logo'>VPFW</div>
    <nav>
        <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Transactions</a></li>
            <li><a href="#">Works</a></li>
        </ul>
    </nav>
    </div>
  )
}

export default Header