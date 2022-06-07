import React, { useState, useEffect } from 'react';
import TablaOperaciones from '../components/tabla_operaciones.js'
import ResultModal from '../components/result_modal.js'
import Dropdown from '../components/dropdown.js'
import PageHeader from '../components/page_header.js'



export default function OperacionesDelDia(props){
  const axios = require('axios').default;
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleLoginClick = () => {
    axios.get("http://127.0.0.1:3100/api/usuarios/login", {
        params: {
          usuario: usuario,
          password: password
        }  
      })
      .then(function (response) {
        const user = {id: response.data.id, nombre: response.data.nombre}
        debugger;
        window.sessionStorage.setItem("user", JSON.stringify(user));
        console.log(window.sessionStorage.getItem("user"))
        window.location.href = "/"
      })
      .catch(function (error) {
        const user = {id: 0, nombre: ""}
        window.sessionStorage.setItem("user", JSON.stringify(user));
        setMensaje("Usuario o contraseña inexistente")
        console.log(error);
      })
  }


  const handleUsuarioChange = (e) => {
    setUsuario(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    const user = {id: 0, nombre: ""}
    window.sessionStorage.setItem("user", JSON.stringify(user));
  },[]);

  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100">
          <div class="px-8 py-6 mt-4 text-left bg-white shadow-lg">
              <div class="flex justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-20 h-20 text-blue-600" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                          d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
              </div>
              <h3 class="text-2xl font-bold text-center">Ingresa con tu usuario</h3>
              
                  <div class="mt-4">
                      <div>
                          <label class="block" >Usuario</label>
                            <input onChange={handleUsuarioChange} type="text" placeholder="Usuario"
                                class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                            <span class="text-xs tracking-wide text-red-600">{mensaje} </span>
                      </div>
                      <div class="mt-4">
                          <label class="block">Password</label>
                                  <input onChange={handlePasswordChange} type="password" placeholder="Password"
                                      class="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"/>
                      </div>
                      <div class="flex items-baseline justify-between">
                          <button onClick={handleLoginClick} class="px-6 py-2 mt-4 text-white bg-primary rounded-lg hover:bg-secondary">Login</button>
                      </div>
                  </div>
              
          </div>
      </div>
    </>
  )
}