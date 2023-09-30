import React, { useState, useEffect } from 'react'


const Rickandmorty = () => {

  const [personajes, setPersonajes] = useState([])


  const obtenerDatos = async () => {
    try {
      const data = await fetch('https://rickandmortyapi.com/api/character')
      const users = await data.json()
      setPersonajes(users.results)
      // console.log(users.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    obtenerDatos()
  }, [])

  return (
    <div className=' container py-5'>
      <h1 className='py-5 text-center'>Consumir Api - Rick and Morty</h1>
      <div className='row'>
        {
          personajes.map(item => (
            <div className='col my-3' key={item.id}>
              <>
                <div className='card'>
                  <img
                    className='shadow bg-body rounded rounded-circle'
                    src={item.image}
                    alt="imagen"
                  />
                  <div className='card-body'>
                    <h5 className='card-title'>{item.name}</h5>
                    <p className='card-text'>Status: {item.status}</p>
                    <br/>
                    <p className='card-text'>Especie: {item.species}</p>
                    <br/>
                  </div>
                </div>
              </>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Rickandmorty
