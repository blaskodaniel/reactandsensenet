import React, { useEffect, useState, useReducer, createContext, Dispatch } from "react";
import { useRepository } from "@sensenet/hooks-react";
import { Folder } from "@sensenet/default-content-types";

export type SinglePageContent = Folder & { 
    Pagecontent: string, 
    Pagetitle: string, 
    Isdisplay: boolean,
    Isroute: boolean,
    Componentlist: string,
    Menuname: string
}

export interface IMenuContext{
    menuresult: SinglePageContent[],
    menuloading: boolean,
    menuerror: boolean
}

export const MenuContext = createContext<IMenuContext>(null as any);

export const MenuProvider: React.FunctionComponent = props => {
  const repo = useRepository();
  const [menuresult, setmenuresult] = useState<SinglePageContent[]>([]);
  const [menuerror, setmenuerror] = useState(false);
  const [menuloading, setmenuloading] = useState(false);

  const loadMenuitems = async () => {
    const ac = new AbortController()
    try {
      setmenuloading(true)
      const result = await repo.loadCollection<SinglePageContent>({
        path: "/Root/Sites/Default_Site/Pages",
        requestInit: {
            signal: ac.signal,
        },
        oDataOptions: {
          filter: "",
          query: "",
          metadata: "no",
          select: [
            'DisplayName',
            'Name',
            'Pagecontent',
            'Pagetitle',
            'Isdisplay',
            'Isroute',
            'Menuname',
            'Componentlist'
          ]
        }
      });
      setmenuresult(result.d.results);
    } catch (error) {
      console.error("ERROR during load menu")
      if (!ac.signal.aborted) {
        setmenuerror(true)
      }
    } finally{
      setmenuloading(false)
    }
  };

  useEffect(() => {
    loadMenuitems();
  }, []);

  return (
    <MenuContext.Provider
      value={{
        menuresult: menuresult,
        menuloading: menuloading,
        menuerror: menuerror
      }}
    >
      {props.children}
    </MenuContext.Provider>
  );
};
