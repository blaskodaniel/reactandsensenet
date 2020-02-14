import React, { useState, useEffect, useContext, Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { SinglePageContent, MenuContext } from './contexts/menucontext';
import parse from 'html-react-parser';
import { useMenu } from './hooks/useMenu';
import ComponentCreator, { IBlock } from './components/utils/_importer';
import uuid from "uuid";

//const CustomComponent2 = React.lazy(() => import("./components/Testcomponent"));

/* {
    _uid: uuid.v4(),
    component: "Bar",
    property: "fdhdfh"
  } */

const PageView: React.FunctionComponent<RouteComponentProps<{params: string}> & {pagecontent: SinglePageContent}> = props => {
    const [pagedata, setpagedata] = useState<SinglePageContent>(props.pagecontent)
    const [components, setcomponents] = useState<any[]>([])

    useEffect(()=>{
        setpagedata(props.pagecontent)
        if(props.pagecontent && props.pagecontent.Componentlist){
            try{
                const json_complist = JSON.parse(props.pagecontent.Componentlist)
                let componentslist: any[] = [];
                json_complist.forEach((x:any)=>{
                    componentslist.push({
                        _uid: uuid.v4(),
                        ...x
                    })
                })
                setcomponents(componentslist)
            }catch(ex){
                console.log("Error",ex.message)
            }
        }
    },[props])

    return (
        <div>
            <h2>{pagedata.Pagetitle}</h2>
            {parse(pagedata.Pagecontent)}
            {components.map((block:IBlock) => ComponentCreator(block))}
        </div>
    )
}

export default PageView