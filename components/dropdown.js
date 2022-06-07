export default function Dropdown(props){
  const options = props.options;
  const listOptions = options.map((item) => 
    <option data-id={item.id}>{item.nombre}</option>
  );
  return (
     <select class="select select-bordered w-full max-w-xs" onChange={props.onChange}>
        <option disabled selected>{props.title}</option>
        {listOptions}
    </select>
  )
}