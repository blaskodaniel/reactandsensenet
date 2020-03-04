import React, { useEffect, useState, useContext } from "react";
import "./Simpletext.style.scss"
import { useLocalization } from "../../hooks/use-localization";

import { GeneralProps } from '../../Types';
import { ShareContext } from "../../contexts/sharecontext";

export interface ISimpleText extends GeneralProps {
  property?: string
}

const SimpleText: React.FunctionComponent<ISimpleText> = (props) => {
  const localization = useLocalization()
  const share = useContext(ShareContext)
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
    <div className="component-simpletext">
        <h3>{localization.simpletexttitle}</h3>
        {data ? data.property : null}
        <p>Share: {share.data ? JSON.stringify(share.data) : "nincs share"}</p>
    </div>
  )
};

export default SimpleText;