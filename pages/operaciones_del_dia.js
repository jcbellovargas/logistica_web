import React, { useState, useEffect } from 'react';
import TablaOperaciones from '../components/tabla_operaciones.js'
import ResultModal from '../components/result_modal.js'
import Dropdown from '../components/dropdown.js'
import PageHeader from '../components/page_header.js'



export default function OperacionesDelDia(props){
  const axios = require('axios').default;
  const [loaded, setLoaded] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);
  const [operaciones, setOperaciones] = useState([]);

  const fetchOperacionesDelDia = () => {
    axios.get("http://127.0.0.1:3100/api/operaciones/operaciones_del_dia")
      .then(function (response) {
        setOperaciones(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const getUsuarioId = () => {
    const user = window.sessionStorage.getItem("user");
    const user_json = 0
    if (JSON.parse(user) && JSON.parse(user).id) {
      user_json = JSON.parse(user).id
    } 
    return parseInt(user_json); 
  }
  
  const isLoggedIn = () => {
    const user_json = getUsuarioId();
    return parseInt(user_json) > 0;
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/login"
    }
    fetchOperacionesDelDia();
    setLoaded(true);
  },[]);

  return (
    <>
      <div>
        <PageHeader text={"Operaciones del dia realizadas por destinos con mas de 3 operaciones en el dia"}/>

        <div class="divider"></div> 
        <TablaOperaciones mostrarFecha={true} operaciones={operaciones}></TablaOperaciones>
      </div>
    </>
  )
}