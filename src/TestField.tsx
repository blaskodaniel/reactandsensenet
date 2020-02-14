import React, { useState } from 'react'
import { FormProps } from 'react-jsonschema-form';

const TestComponent: React.FunctionComponent = props => {
    const [formdata, setformdata] = useState((props  as FormProps<any>).formData)
    const [lat, setlat] = useState(34)
    const [lon, setlon] = useState(54)
  
    const onChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        console.log(props)
        if(name === "lat"){
            setlat(parseFloat(e.target.value))
        }else{
            setlon(parseFloat(e.target.value))
        }
        
        setformdata({...formdata,[name]: parseFloat(e.target.value)});
    }

      return (
        <div>
          <input type="number" value={lat} onChange={(e) => onChange(e, "lat")} />
          <input type="number" value={lon} onChange={(e) => onChange(e, "lon")} />
        </div>
      );

  }

  export default TestComponent