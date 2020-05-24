import React from 'react'
import logo from '../static/files.svg'
import './Navbar.css'

function Navbar(){
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="/">
            <img src={logo} width="60" height="60" className="d-inline-block align-top" alt="" loading="lazy">
            </img>
            FileFly<span className="font-weight-bolder">Send</span>
          </a>
        </nav>
    )
}

export default Navbar