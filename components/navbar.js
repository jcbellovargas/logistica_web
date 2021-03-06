import Link from 'next/link';
import React, { useState, useEffect } from 'react';
export default function Navbar() {
  const [usuario, setUsuario] = useState("Login");


  useEffect(() => {
    
    const user = window.sessionStorage.getItem("user");
    const user_json = JSON.parse(user);
    if (user_json && user_json.id > 0){
      setUsuario(user_json.nombre)
    } else {
      setUsuario("Login")
    }
    debugger;

    // setUsuario(JSON.parse(user) || "Login")
  },[]);



  return (

    <div class="navbar bg-base-100 bg-primary text-primary-content">
      <div class="flex-1">
        <Link href="/">
          <a class="btn btn-ghost normal-case text-xl">LogisticApp</a>
        </Link>
        
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal p-0">
          <li>
            <Link href="/">
             <a>Transferir Stock</a>
            </Link>
          </li>
          <li>
            <Link href="/operaciones_por_destino">
             <a>Operaciones por Destino</a>
            </Link>
          </li>
         <li>
            <Link href="/operaciones_por_fecha">
             <a>Operaciones por Fecha</a>
            </Link>
          </li>
          <li>
            <Link href="/operaciones_del_dia">
             <a>Operaciones del dia</a>
            </Link>
          </li>
          <li tabindex="0">
            <a>
              Entidades
              <svg class="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul class="p-2 bg-base-100">
              <li><a>Productos</a></li>
              <li><a>Locales</a></li>
            </ul>
          </li>
          <li>
            <Link href="/login">
             <a class="btn btn-primary">{usuario}</a>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}



