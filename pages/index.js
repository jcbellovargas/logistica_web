import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Dropdown from '../components/dropdown.js'
import InputBox from '../components/input_box.js'
import ResultModal from '../components/result_modal.js'
import TablaOperaciones from '../components/tabla_operaciones.js'
import React, { useState, useEffect } from 'react';


export default function Home() {
  const axios = require('axios').default;

  const [origenOptions, setOrigenOptions] = useState([]);
  const [destinoOptions, setDestinoOptions] = useState([]);
  const [productoOptions, setProductoOptions] = useState([]);
  const [selectedOrigen, setSelectedOrigen] = useState(0);
  const [selectedDestino, setSelectedDestino] = useState(0);
  const [selectedProducto, setSelectedProducto] = useState(0);
  const [selectedCantidad, setSelectedCantidad] = useState(0);
  const [operaciones, setOperaciones] = useState([]);
  const [mensajeModal, setMensajeModal] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);
  const [loaded, setLoaded] = useState(false);


  const fetchLocales = () => {
    axios.get("http://127.0.0.1:3100/api/locales")
      .then(function (response) {
        setDestinoOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const fetchDepositos = () => {
    axios.get("http://127.0.0.1:3100/api/locales/depositos")
      .then(function (response) {
        setOrigenOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const fetchProductos = () => {
    axios.get("http://127.0.0.1:3100/api/productos")
      .then(function (response) {
        setProductoOptions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  const fetchOperaciones = () => {
    axios.get("http://127.0.0.1:3100/api/operaciones")
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

  const handleOrigenSelectChange = (e) => {
    const origen_id = getOptionId(e);
    setSelectedOrigen(origen_id)
  }

  const handleDestinoSelectChange = (e) => {
    const destino_id = getOptionId(e);
    setSelectedDestino(destino_id)
  }

  const handleProductoSelectChange = (e) => {
    const producto_id = getOptionId(e);
    setSelectedProducto(producto_id)
  }

  const handleCantidadChange = (e) => {
    setSelectedCantidad(e.target.value)
  }

  const handleTransferirStock = () => {
    axios.post("http://127.0.0.1:3100/api/operaciones", {
      origen_id: selectedOrigen,
      destino_id: selectedDestino,
      producto_id: selectedProducto,
      cantidad: selectedCantidad
    })
    .then(function (response) {
      fetchOperaciones();
      setMensajeModal(response.data);
      setMostrarModal(true);
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {
    fetchDepositos();
    fetchLocales();
    fetchProductos();
    fetchOperaciones();
    setLoaded(true);
  },[]);

  return (
    <>
    <div>
      {loaded && (
        <div class="mx-10 grid grid-cols-5 gap-1 content-start ...">
          <Dropdown title="Origen" options={origenOptions} onChange={handleOrigenSelectChange}></Dropdown>
          <Dropdown title="Destino" options={destinoOptions} onChange={handleDestinoSelectChange}></Dropdown>
          <Dropdown title="Producto" options={productoOptions} onChange={handleProductoSelectChange}></Dropdown> 
          <InputBox placeholder="Cantidad" onChange={handleCantidadChange}></InputBox>
          <a href="#my-modal-2" class="btn btn-primary" onClick={handleTransferirStock}>Transferir Stock</a>      
        </div>
      )}

      <div class="divider"></div> 
      <TablaOperaciones operaciones={operaciones}></TablaOperaciones>
      {mostrarModal && (<ResultModal result={mensajeModal}></ResultModal>)}    
    </div>



    </>

  )
}
