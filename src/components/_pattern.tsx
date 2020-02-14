import React, { useState, useEffect } from "react";
import { GeneralProps } from '../Types';

export interface IPatternComponent extends GeneralProps {
  proprty?: string,
  property2?: number
}
const PatternComponent = (props: IPatternComponent) => {
  const [data, setdata] = useState()

  useEffect(()=>{
      try{
        if(props && props){
            setdata(props)
        }
      }catch(ex){
        console.log("Error in CustomComponent component with props", ex.message)
      }
  },[props]) 

  return (
    <div>Component pattern {data ? data.propert : null}</div>
  )
};

export default PatternComponent;