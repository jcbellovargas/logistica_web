export default function TablaOperaciones(props){
  const operaciones = props.operaciones;
  return (
    <>
      <div class="grid place-items-center h-fit">
      <table class="table w-9/12">
        <thead>
          <tr>
            <th class="bg-primary"></th>
            <th class="bg-primary">Origen</th>
            <th class="bg-primary">Destino</th>
            <th class="bg-primary">Producto</th>
            <th class="bg-primary">Cantidad</th>
            <th class="bg-primary">Usuario</th>
          </tr>
        </thead>
        <tbody>
          {operaciones.map((item, i) => (
            <tr class="hover" key={i}>
              <th>{i+1}</th>
              <td>{item.origen.nombre}</td>
              <td>{item.destino.nombre}</td>
              <td>{item.producto.nombre}</td>
              <td>{item.cantidad}</td>
              <td>{item.usuario.nombre}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>

  )
}