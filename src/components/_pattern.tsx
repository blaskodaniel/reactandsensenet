import React, { useState, useEffect } from "react";

const CustomComponent = (props: any) => {
  const [data, setdata] = useState()

  useEffect(()=>{
      try{
        if(props && props.properties){
            setdata(props.properties)
        }
      }catch(ex){
        console.log("Error in CustomComponent component with props", ex.message)
      }
  },[props]) 

  return (
    <div>Component pattern {data ? data.propert : null}</div>
  )
};

export default CustomComponent;