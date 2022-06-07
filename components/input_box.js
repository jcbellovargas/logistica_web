export default function InputBox(props){
  return (
    <input type="number" onChange={props.onChange} placeholder={props.placeholder} class="input input-bordered w-full max-w-xs" />
  )
}