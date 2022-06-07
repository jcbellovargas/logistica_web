import React, { useState, useEffect } from 'react';
import TablaOperaciones from '../components/tabla_operaciones.js'
import ResultModal from '../components/result_modal.js'
import Dropdown from '../components/dropdown.js'
import DatePicker from "../components/datepicker.js";
import PageHeader from "../components/page_header.js";

import "react-datepicker/dist/react-datepicker.css";


export default function OperacionesPorFecha(props){
  const axios = require('axios').default;
  const [loaded, setLoaded] = useState(false);
  const [mensajeModal, setMensajeModal] = useState(false);
  const [operaciones, setOperaciones] = useState([]);
  const [selectedTienda, setSelectedTienda] = useState(0);
  const [tiendaOptions, setTiendaOptions] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(null);
  const [fechaFin, setFechaFin] = useState(null);

  const fetchLocales = () => {
    axios.get("http://127.0.0.1:3100/api/locales/tiendas")
      .then(function (response) {
        setTiendaOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const fetchOperaciones = () => {
    axios.get("http://127.0.0.1:3100/api/operaciones/destino", {
        params: {
          destino_id: selectedTienda
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

  const handleTiendaSelectChange = (e) => {
    const destino_id = getOptionId(e);
    setSelectedTienda(destino_id)
  }

  const handleFechaInicioChange = (e) => {
    debugger;
    setFechaInicio(e.target.value)
  }

  const handleFechaFinChange = (e) => {
    debugger;
    setFechaFin(e.target.value)
  }

  const handleBuscarOperaciones = () => {
    debugger;
    axios.get("http://127.0.0.1:3100/api/operaciones/por_tienda_fecha", {
        params: {
          destino_id: selectedTienda,
          fecha_inicio: fechaInicio,
          fecha_fin: fechaFin
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

  const isLoggedIn = () => {
    
    const user = window.sessionStorage.getItem("user");
    const user_json = JSON.parse(user).id;
    return parseInt(user_json) > 0;
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      window.location.href = "/login"
    }
    fetchLocales();
    setLoaded(true);
  },[]);

  return (
    <>
      <div>
      <PageHeader text={"Operaciones filtradas por destino y fecha."}/>

          <div class="mx- 10 h-10 flex flex-row justify-center">
            <Dropdown title="Tienda" options={tiendaOptions} onChange={handleTiendaSelectChange}></Dropdown>
            <DatePicker onChange={handleFechaInicioChange}></DatePicker>
            <DatePicker onChange={handleFechaFinChange}></DatePicker>
            <a href="#my-modal-2" class="btn btn-primary" onClick={handleBuscarOperaciones}>Buscar Operaciones</a>      
          </div>
      

        <div class="divider"></div> 
        <TablaOperaciones mostrarFecha={true} operaciones={operaciones}></TablaOperaciones>
        {/*<ResultModal result={mensajeModal}></ResultModal>)   */}
      </div>
    </>
  )
}