import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import Formulario from '../components/Formulario'
import '../spinner.css'

const EditarCliente = () => {
  const {id} = useParams()
  const [cliente,setCliente] = useState({})
  const [cargando,setCargando] = useState(true)
  useEffect(()=>{

      const obtenerClienteAPI = async ()=>{
          try{
              const url = `http://localhost:4000/clientes/${id}`
              const respuesta = await fetch(url)
              const resultado = await respuesta.json()
              setCliente(resultado)
          }catch (error) {
              console.log(error)
          }
          setCargando(!cargando)
      }
      obtenerClienteAPI()
  },[])
  return (
    cargando ? <div className="spinner"></div>:(

    <div>
        <h1 className='font-black text-4xl text-blue-900 mt-10'>Editar Cliente</h1>
        <p className='mt-3'>Utiliza este formulario para cambiar datos del cliente</p>
        {Object.keys(cliente).length === 0 ? <p className="mt-10 text-4xl text-red-400 font-bold">No hay Resultados</p> : (
        <Formulario cliente={cliente} />
        )}
    </div>
    )
  )
}

export default EditarCliente