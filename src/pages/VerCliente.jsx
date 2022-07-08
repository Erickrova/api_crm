import { useEffect,useState } from "react"
import { useParams } from "react-router-dom"
import '../spinner.css'

const VerCliente = () => {
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
    cargando ? <div className="spinner"></div> : Object.keys(cliente).length === 0 ? <p className="mt-10 text-4xl text-red-400 font-bold">No hay Resultados</p> : (
    <div>
        
        <h1 className='font-black text-4xl text-blue-900 mt-10'>Ver Cliente: {cliente.nombre}</h1>
        <p className='mt-3'>informacion del clientez</p>

        <p className=" mt-10 text-4xl text-gray-600 ">
             <span className="uppercase text-gray-800 font-bold">Cliente: </span> 
            {cliente.nombre}
        </p>
        {cliente.email && (
        <p className="text-2xl mt-4 text-gray-600 ">
             <span className="uppercase text-gray-800 font-bold">E-mail: </span> 
            {cliente.email}
        </p>
        )}
        {cliente.telefono && (
        <p className="text-2xl mt-4 text-gray-600 ">
             <span className="uppercase text-gray-800 font-bold">Telefono: </span> 
            {cliente.telefono}
        </p>
        )}
        {cliente.empresa && (
        <p className="text-2xl mt-4 text-gray-600 ">
             <span className=" text-gray-800 font-bold">Empresa: </span> 
            {cliente.empresa}
        </p>

        )}
        {cliente.notas && (
        <p className="text-2xl mt-4 text-gray-600 ">
             <span className="uppercase text-gray-800 font-bold">Notas: </span> 
            {cliente.notas}
        </p>
        )}
    </div>
    )
  )
}

export default VerCliente