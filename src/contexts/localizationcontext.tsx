import React, { createContext, useState, useEffect, Dispatch } from "react";
import { useFetch } from "../hooks/use-fetch";

export interface LocalizationContext {
    data: any,
    setculture: Dispatch<React.SetStateAction<string>>,
    getculture: string
}

export const LocalizationContext = createContext<LocalizationContext>(null as any);

export const LocalizationProvider: React.FunctionComponent = props => {
  const [culture, setculture] = useState("en")
  const usefetch = useFetch({url: `/sntools/getlocalization?className=Mkkpoc&culture=${culture}`})
  const [data, setdata] = useState<any>({})

  useEffect(()=>{
    if(usefetch.response !== null){
        setdata(usefetch.response)
    }
  },[usefetch.response])

  return (
    <LocalizationContext.Provider value={{data: data, setculture: setculture, getculture: culture}}>
      {props.children}
    </LocalizationContext.Provider>
  );
};