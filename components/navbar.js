import Link from 'next/link';
export default function Navbar() {
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
              {/*<li><a>Local</a></li>*/}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  )
}