import { useState, useEffect } from "react";
import { useFetch } from "./use-fetch";

export const useComponentSetting = (settingname?: string) => {
  const componentsettingsfetch = useFetch({ url: settingname ? `sntools/getsettings?settingsName=${settingname}` : ""})
  const [componentsettingsdata, setcomponentsettingsdata] = useState<any>({});

  useEffect(() => {
    if (componentsettingsfetch && componentsettingsfetch.response !== null) {
      setcomponentsettingsdata(componentsettingsfetch.response);
    }
  }, [componentsettingsfetch]);

  return componentsettingsdata
};
