export default function DatePicker(props){

  return (
    <div class="form-control w-full max-w-xs">

      <input class="input w-full max-w-xs"
             type="date" 
             id="start" 
             name="startasd" 
             // value="2020-05-01"
             onChange={props.onChange} 
             min="2022-05-01" 
             max="2027-12-31">
      </input>
    </div>

           
  )
}