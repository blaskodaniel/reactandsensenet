import React, { createContext, useState, useEffect } from "react";
import { useFetch } from "../hooks/use-fetch";

export interface ISettingContext {
    data: any
}

export const SettingContext = createContext<ISettingContext>(null as any);

export const SettingProvider: React.FunctionComponent = props => {
  const usefetch = useFetch({url: `sntools/getsettings?settingsName=${process.env.REACT_APP_SETTING}`})
  const [data, setdata] = useState<any>({})

  useEffect(()=>{
    if(usefetch.response !== null){
        setdata(usefetch.response)
    }
  },[usefetch.response])

  return (
    <SettingContext.Provider value={{data: data}}>
      {props.children}
    </SettingContext.Provider>
  );
};
