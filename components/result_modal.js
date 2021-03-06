export default function ResultModal(props){
  const titulo = props.result.status == 'OK' ? "Listo!" : "Error!"
  const mensaje = props.result.mensaje

  return (
    <div class="modal" id="my-modal-2">
      <div class="modal-box">
        <h3 class="font-bold text-lg">{titulo}</h3>
        <p class="py-4">{mensaje}</p>
        <div class="modal-action">
          <a href="#" class="btn">OK</a>
        </div>
      </div>
    </div>
  )
}