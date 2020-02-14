import React, { createContext, useState, useEffect, Dispatch } from "react";

export interface ShareContext {
    data: any;
    setdata: Dispatch<React.SetStateAction<any>>;
}

export const ShareContext = createContext<ShareContext>(null as any);

export const ShareProvider: React.FunctionComponent = props => {
  const [data, setdata] = useState<any>()

  return (
    <ShareContext.Provider value={{data: data, setdata: setdata}}>
      {props.children}
    </ShareContext.Provider>
  );
};