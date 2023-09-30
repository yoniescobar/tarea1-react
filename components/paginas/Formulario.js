import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import DataTable from 'react-data-table-component'

const Formulario = () => {

  const [codigo, setCodigo] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [edad, setEdad] = useState('')
  const [correo, setCorreo] = useState('')
  const [modoEdicion, setModoEdicion] = useState(false)
  const [lista, setLista] = useState([])
  const [filtrarPersona, setFiltrarPersona] = useState([])
  const [busqueda, setBusqueda] = useState('')


  /*------------ Generar Codigo Automatico ------------*/
  const generarId = () => {
    return Math.floor(Math.random() * 100000000)
  }

  /*------------ llenarCampos ------------*/

  const llenarCampos = (dato) => {
    Swal.fire({
      icon: 'error',
      title: 'Oops... ',
      text: `El campo ${dato} no puede estar vacio`,
    })
  }

  /*------------ Agregar Usuario ------------*/
  const agregarUsuario = (e) => {
    e.preventDefault() // Evita que se recargue la pagina
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (apellido.trim() === '') {
      llenarCampos('Apellido')
      return
    }
    if (edad.trim() === '') {
      llenarCampos('Edad')
      return
    }
    if (correo.trim() === '') {
      llenarCampos('Correo')
      return
    }

    const nuevoUsuario = { codigo: generarId(), nombre, apellido, edad, correo }
    setLista([...lista, nuevoUsuario]) // Agrega el nuevo usuario a la lista
    setNombre('')
    setApellido('')
    setEdad('')
    setCorreo('')

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario Agregado',
      showConfirmButton: false,
      timer: 1500
    })

  }

  /*------------ Eliminar Usuario ------------*/

  const eliminar = (codigo, nombre) => {
    Swal.fire({
      title: `Estas seguro de eliminar a ${nombre}?`,
      text: "No podras revertir esta accion!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {

      if (result.isConfirmed) {
        const nuevaLista = lista.filter(item => item.codigo !== codigo)
        setLista(nuevaLista)
        console.log(nuevaLista)
        Swal.fire(
          'Eliminado!',
          'El registro ha sido eliminado.',
          'success'
        )
      }
    })
  }

  /*------------ Editar Usuario ------------*/
  const editar = (row) => {
    setCodigo(row.codigo)
    setNombre(row.nombre)
    setApellido(row.apellido)
    setEdad(row.edad)
    setCorreo(row.correo)
    setModoEdicion(true)
  }

  const guardarCambios = (e) => {
    e.preventDefault()
    if (nombre.trim() === '') {
      llenarCampos('Nombre')
      return
    }
    if (apellido.trim() === '') {
      llenarCampos('Apellido')
      return
    }
    if (edad.trim() === '') {
      llenarCampos('Edad')
      return
    }
    if (correo.trim() === '') {
      llenarCampos('Correo')
      return
    }

    const editado = lista.map(item => item.codigo === codigo ? { codigo, nombre, apellido, edad, correo } : item)
    setLista(editado)
    setModoEdicion(false)

    setNombre('')
    setApellido('')
    setEdad('')
    setCorreo('')


    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Usuario Editado',
      showConfirmButton: false,
      timer: 1500
    })
  }

  /*------------ Buscar Usuario ------------*/

  useEffect(() => {
    const filtrar=()=>{
       const resultado = lista.filter((item)=>{
        return(
          item.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.apellido.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.edad.toLowerCase().includes(busqueda.toLowerCase()) ||
          item.correo.toLowerCase().includes(busqueda.toLowerCase())
        );
         });
          setFiltrarPersona(resultado);
    }
    filtrar();

  }, [busqueda,lista]) //se ejecuta cuando cambia el valor de busqueda o lista (cuando se agrega un nuevo usuario) 


  return (
    <div className='container py-5'>
      <h1 className='py-5'>Formulario de  Clientes - CRUD</h1>
      {/* Incia el Formulario  */}

      <form className='form-group'>
        <input
          type='text'
          placeholder='Ingrese su Nombre'
          className='form-control mb-3'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type='text'
          placeholder='Ingrese su Apellido'
          className='form-control mb-3'
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <input
          type="number"
          min={0}
          max={100}
          placeholder='Edad'
          className='form-control mb-3'
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
        />
        <input
          type='email'
          placeholder='Ingrese su Email'
          className='form-control mb-3'
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
        />
        {
          modoEdicion ?
            (<button onClick={(e) => guardarCambios(e)} className='btn btn-warning btn-block' type='submit'>Guardar Cambios</button>)
            :
            (<button className='btn btn-dark btn-block'
              onClick={(e) => agregarUsuario(e)}
              type='submit'><span><i className="fa-solid fa-plus"></i></span> Agregar Usuario</button>)
        }

      </form>

      {/* Crear nuestro DataTable  */}

      <div className='container py-5'>
        <h1 >Listado de Clientes</h1>

        <DataTable
          columns={[
            {
              name: 'Codigo',
              selector: row => row.codigo,
              sortable: true
            },
            {
              name: 'Nombre',
              selector: row => row.nombre,
              sortable: true
            },
            {
              name: 'Apellido',
              selector: row => row.apellido,
              sortable: true
            },
            {
              name: 'Edad',
              selector: row => row.edad,
              sortable: true
            },
            {
              name: 'Correo',
              selector: row => row.correo,
              sortable: true
            },
            {
              name: 'Acciones',
              cell: (row) => (
                <>
                  <button onClick={() => { eliminar(row.codigo, row.nombre) }} className='btn btn-danger btn-sm '><span><i className="fa-solid fa-trash-can"></i></span></button>{' '}
                  <button onClick={() => { editar(row) }} className='btn btn-warning btn-sm mx-1'><span><i className="fa-solid fa-pencil"></i></span></button>
                </>
              )
            },
          ]}

          data={filtrarPersona}
          pagination
          paginationComponentOptions={{
            rowsPerPageText: 'Filas por Pagina',
            rangeSeparatorText: 'de',
            noRowsPerPage: false,
            selectAllRowsItem: false,
            selectAllRowsItemText: 'Todos'
          }}
          highlightOnHover
          pointerOnHover
          subHeader
          subHeaderComponent={(
            <input type='text'
              placeholder='Buscar'
              className='w-25 form-control'
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          )}

        ></DataTable>

      </div>


    </div>
  )
}

export default Formulario
