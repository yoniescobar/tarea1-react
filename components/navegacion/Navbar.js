import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link to='/'>
            <img src='./logo-intecap.png' alt='logo' width='100px' height='50px' />
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto fs-2">
              <li className="nav-item">
                <Link className="nav-link active navbar-dark" aria-current="page" to='/'>Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-dark" to='/apirick'>Api RickMorty</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link navbar-dark" to='/formulario'>Formulario</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
