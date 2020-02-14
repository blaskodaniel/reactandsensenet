import React, { useState, useCallback, useEffect } from "react";
import uuid from "uuid";
import { useDropzone } from "react-dropzone";
import { useLocalization } from "../hooks/use-localization";

const Dragdrop: React.FunctionComponent = (props:any) => {
  const localization = useLocalization()
  const [filecollection, setfilecollection] = useState<File[]>([]);
  const [formdata, setformdata] = useState(props)
  const [data, setdata] = useState()

  useEffect(()=>{
      try{
        if(props && props.properties){
            setdata(props.properties)
        }
      }catch(ex){
        console.log("Error in SimpleText component with props", ex.message)
      }
  },[props]) 

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newarray = [...filecollection].concat(acceptedFiles);
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
    setfilecollection(removedarray);
  };

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  return (
    <section className="container">
      <div {...getRootProps({ className: "dropzone" })}>
        <input  {...getInputProps()} />
        <p>{localization.dragdroptext}</p>
      </div>
      <aside>
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
      </aside>
    </section>
  );
};

export default Dragdrop;
