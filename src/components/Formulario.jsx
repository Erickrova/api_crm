import React from 'react'
import {Formik,Form,Field,ErrorMessage} from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

const Formulario = ({cliente}) => {

  const navigate = useNavigate()

  const nuevoClienteSchema = Yup.object().shape({
    nombre: Yup.string()
    .min(3,'El nombre es muy corto')
    .max(40, 'El nombre es muy largo')
    .required('El Nombre Del Cliente Es Obligatorio'),
    empresa: Yup.string().required('La Empresa Del Cliente Es Obligatorio'),
    email: Yup.string().email('Email NO Valido').required('El Email Del Cliente Es Obligatorio'),
    telefono: Yup.number().positive('Telefono No Valido').integer('Telefono No Valido').typeError('El Telefono NO es valido'),
    
  })

  const handlesubmit = async (values)=>{
        try {
          let respuesta
          if(cliente.id){
              // editando
              const url = `http://localhost:4000/clientes/${cliente.id}`

            respuesta = await fetch(url,{
              method:'PUT',
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json'
              }
            })

          }else{
              // agregando cliente
              const url = 'http://localhost:4000/clientes'

             respuesta = await fetch(url,{
              method:'POST',
              body: JSON.stringify(values),
              headers: {
                'Content-Type': 'application/json'
              }
            })
          }
          await respuesta.json()
          navigate('/clientes')
        } catch (error) {
          console.log(error)
        }
  }

  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto mb-10'>
        <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{Object.keys(cliente).length > 0 ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

        <Formik 
          initialValues={{
            nombre: cliente.nombre ? cliente.nombre : '',
            empresa: cliente.empresa ? cliente.empresa : '',
            email: cliente.email ? cliente.email : '',
            telefono: cliente.telefono ? cliente.telefono : '',
            notas: cliente.notas ? cliente.notas : ''
          }}
          enableReinitialize={true}
          onSubmit={async(values,{resetForm})=>{
              await handlesubmit(values)
              resetForm()
          }}
          validationSchema={nuevoClienteSchema}
        >
          {({errors,touched})=>(
            <Form className='mt-10'>
              <div className="">
                <label htmlFor="nombre" className='text-gray-800'>Nombre</label>
                <Field type='text' name='nombre' id='nombre' placeholder='Nombre del cliente' className='mt-2 block w-full p-3 bg-gray-50' />
                {errors.nombre && touched.nombre ? (
                  <div className="text-center bg-red-600 font-bold my-4 text-white p-3 uppercase">
                    {errors.nombre}
                  </div>
                ): null}
              </div>
              <div className="">
                <label htmlFor="empresa" className='text-gray-800'>Empresa</label>
                <Field type='text' name='empresa' id='empresa' placeholder='Empresa del cliente' className='mt-2 block w-full p-3 bg-gray-50' />
                {errors.empresa && touched.empresa ? (
                  <div className="text-center bg-red-600 font-bold my-4 text-white p-3 uppercase">
                    {errors.empresa}
                  </div>
                ): null}
              </div>
              <div className="">
                <label htmlFor="email" className='text-gray-800'>E-mail</label>
                <Field type='email' name='email' id='email' placeholder='E-mail del cliente' className='mt-2 block w-full p-3 bg-gray-50' />
                {errors.email && touched.email ? (
                  <div className="text-center bg-red-600 font-bold my-4 text-white p-3 uppercase">
                    {errors.email}
                  </div>
                ): null}
              </div>
              <div className="">
                <label htmlFor="telefono" className='text-gray-800'>Telefono</label>
                <Field type='tel' name='telefono' id='telefono' placeholder='Telefono del cliente' className='mt-2 block w-full p-3 bg-gray-50' />
                {errors.telefono && touched.telefono ? (
                  <div className="text-center bg-red-600 font-bold my-4 text-white p-3 uppercase">
                    {errors.telefono}
                  </div>
                ): null}
              </div>
              <div className="">
                <label htmlFor="notas" className='text-gray-800'>Notas</label>
                <Field as='textarea' name='notas' type='text' id='notas' placeholder='Notas del cliente' className='h-40 mt-2 block w-full p-3 bg-gray-50' />
                {errors.notas && touched.notas ? (
                  <div className="text-center bg-red-600 font-bold my-4 text-white p-3 uppercase">
                    {errors.notas}
                  </div>
                ): null}
              </div>
              <input type="submit" name="" id="" value={Object.keys(cliente).length > 0 ? 'Editar Cliente' : 'Agregar Cliente'} className='mt-5 w-full bg-blue-800 p-3 uppercase text-white font-bold text-lg hover:cursor-pointer' />
            </Form>
          )}
        </Formik>

    </div>
  )
}

Formulario.defaultProps = {
  cliente: {}
}

export default Formulario