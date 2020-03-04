import React, { useState, useEffect } from "react";
import { useLocalization } from "../hooks/use-localization";
import { useSetting } from "../hooks/use-settings";
import { useComponentSetting } from "../hooks/use-componentsettings";
import { GeneralProps } from '../Types';

export interface IPatternComponent extends GeneralProps {
  settingname?: string
}
const PatternComponent = (props: IPatternComponent) => {
  const localization = useLocalization() // Localization
  const settings = useSetting() // Main settings
  const componentsettings = useComponentSetting(props.settingname) // Component settings
  const [data, setdata] = useState()

  useEffect(()=>{
    try{
      if(props){
          setdata(props)
      }
    }catch(ex){
      console.log("Error in component", ex.message)
    }
},[props])  

  return (
    <div className="component-componentname">
      Component pattern {data ? data.propert : null}
    </div>
  )
};

export default PatternComponent;
