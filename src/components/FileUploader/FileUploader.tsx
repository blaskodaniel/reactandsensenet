import React, { useState, useCallback, useEffect } from "react";
import uuid from "uuid";
import { useDropzone } from "react-dropzone";
import Grid from "@material-ui/core/Grid";
import { GeneralProps } from "../../Types";
import "./FileUploader.style.scss";
import { useLocalization } from "../../hooks/use-localization";
import { useSetting } from "../../hooks/use-settings";
import { useComponentSetting } from "../../hooks/use-componentsettings";
import { convertToUnit } from "../../utils";

interface IFileUploader extends GeneralProps {
  settingname?: string
}

const FileUploader: React.FunctionComponent<IFileUploader> = (props) => {
  const localization = useLocalization()
  const settings = useSetting() // Main settings
  const componentsettings = useComponentSetting(props.settingname) // Component settings
  
  const [filecollection, setfilecollection] = useState<File[]>([]);
  const [data, setdata] = useState()
  const [allsize, setallsize] = useState(0)

  useEffect(()=>{
      try{
        if(props){
            setdata(props)
        }
      }catch(ex){
        console.log("Error in SimpleText component with props", ex.message)
      }
  },[props]) 

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newarray = [...filecollection].concat(acceptedFiles);
      newarray.sort((x:File,y:File)=>x.size - y.size)
      let size = 0
      newarray.forEach((x:File)=>{
        size += x.size
      })
      if(size > componentsettings.maxsize){
        console.log("Túl nagy a méret! (size: "+size, "maxsize: "+componentsettings.maxsize+")")
        return false
      }
      setallsize(size)
      
      setfilecollection(newarray);
      filecollection.forEach((file: File) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          // Do whatever you want with the file contents
          const binaryStr = reader.result;
        };
        reader.readAsArrayBuffer(file);
      });
    },
    [filecollection]
  );

  const removefile = (file: File) => {
    console.log("Remove");
    const newarray = [...filecollection];
    const removedarray = newarray.filter(item => item !== file);
    let size = 0
    removedarray.forEach((x:File)=>{
      size += x.size
    })
    setallsize(size)
    setfilecollection(removedarray);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  return (
    <div className="component-dragdrop">
      <p>{JSON.stringify(componentsettings)}</p>
      <Grid container spacing={1} justify="center" alignItems="center">
        <Grid item xs={12} sm={6}>
          <div {...getRootProps({ className: "dropzone" })}>
            <input  {...getInputProps()} />
            <p>{localization.dragdroptext}</p>
            <p>{settings.REACT_APP_COMPRESSED_START}</p>
          </div>
        </Grid>
        <Grid item xs={12} sm={6}>
          <div className="size">
            <p>{convertToUnit(allsize).value}<span className="sizeprep"> {convertToUnit(allsize).symbol}</span></p>
            <span>/</span>
            <p><span className="sizeprep">max </span>{convertToUnit(componentsettings.maxsize).value}<span className="sizeprep"> {convertToUnit(componentsettings.maxsize).symbol}</span></p>
          </div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
            {filecollection.length > 0 ? (
              <>
                <h4>Files</h4>
                <ul className="filelist">
                  {filecollection.map((x: File) => {
                    return (
                      <li key={uuid()}>
                        <div className="filecontainer row">
                          <div className="filename col-6">{x.name}</div>
                          <div className="filesize col-4">
                            {Math.round(x.size / 1000)} Kbyte
                          </div>
                          <div
                            className="fileremove col-2"
                            onClick={() => removefile(x)}
                          >
                            X
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </>
            ) : null}
        </Grid>
      </Grid>
    </div>
  );
};

export default FileUploader;
