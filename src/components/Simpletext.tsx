import React, { useEffect, useState } from "react";
import { CssBaseline } from "@material-ui/core";
import { useLocalization } from "../hooks/use-localization";

const SimpleText = (props: any) => {
  const localization = useLocalization()
  const [data, setdata] = useState()

  useEffect(()=>{
      try{
        if(props && props.properties){
            setdata(props.properties)
        }
      }catch(ex){
        console.log("Error in SimpleText component with props", ex.message)
      }
  },[props])  
  
  return (
    <React.Fragment>
        <h3>{localization.simpletexttitle}</h3>
        {data ? data.property : null}
    </React.Fragment>
  )
};

export default SimpleText;