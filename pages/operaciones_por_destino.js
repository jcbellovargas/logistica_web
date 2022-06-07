import React, { useState, useEffect } from 'react';
import TablaOperaciones from '../components/tabla_operaciones.js'
import ResultModal from '../components/result_modal.js'
import Dropdown from '../components/dropdown.js'
import PageHeader from '../components/page_header.js'



export default function OperacionesPorDestino(props){
  const axios = require('axios').default;
  const [loaded, setLoaded] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);
  const [operaciones, setOperaciones] = useState([]);
  const [selectedDestino, setSelectedDestino] = useState(0);
  const [destinoOptions, setDestinoOptions] = useState([]);

  const fetchLocales = () => {
    axios.get("http://127.0.0.1:3100/api/locales")
      .then(function (response) {
        setDestinoOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const fetchOperaciones = () => {
    axios.get("http://127.0.0.1:3100/api/operaciones/destino", {
        params: {
          destino_id: selectedDestino
        }  
      })
      .then(function (response) {
        debugger;
        setOperaciones(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const handleDestinoSelectChange = (e) => {
    const destino_id = getOptionId(e);
    setSelectedDestino(destino_id)
  }

  const handleBuscarOperaciones = () => {
    debugger;
    axios.get("http://127.0.0.1:3100/api/operaciones/destino", {
        params: {
          destino_id: selectedDestino
        }  
      })
      .then(function (response) {
        debugger;
        setOperaciones(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const getOptionId = (e) => {
    const index = e.target.selectedIndex;
    const optionElement = e.target.childNodes[index]
    const option_id = optionElement.getAttribute('data-id');
    return option_id;
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
    fetchLocales();
    // fetchOperaciones();
    setLoaded(true);
  },[]);

  return (
    <>
      <div>
          <PageHeader text={"Operaciones filtradas por destino."}/>
          <div class="mx- 10 h-10 flex flex-row justify-center">
            <Dropdown title="Destino" options={destinoOptions} onChange={handleDestinoSelectChange}></Dropdown>
            <a href="#my-modal-2" class="btn btn-primary" onClick={handleBuscarOperaciones}>Buscar Operaciones</a>      
          </div>

        <div class="divider"></div> 
        <TablaOperaciones mostrarFecha={true} operaciones={operaciones}></TablaOperaciones>
        {/*<ResultModal result={mensajeModal}></ResultModal>)   */}
      </div>
    </>
  )
}