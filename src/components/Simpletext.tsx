import React, { useEffect, useState } from "react";
import { useLocalization } from "../hooks/use-localization";

import { GeneralProps } from '../Types';

export interface ISimpleText extends GeneralProps {
  property?: string
}

const SimpleText = (props: ISimpleText) => {
  const localization = useLocalization()
  const [data, setdata] = useState()

  useEffect(()=>{
      try{
        if(props && props){
            setdata(props)
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