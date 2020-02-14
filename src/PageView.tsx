import React, { useState, useEffect, useContext, Suspense } from 'react'
import { RouteComponentProps } from 'react-router-dom';
import { SinglePageContent, MenuContext } from './contexts/menucontext';
import parse from 'html-react-parser';
import { useMenu } from './hooks/useMenu';
import ComponentCreator from './components/utils/_componentCreator';
import uuid from "uuid";
import { GeneralProps } from './Types';

const PageView: React.FunctionComponent<RouteComponentProps<{params: string}> & {pagecontent: SinglePageContent}> = props => {
    const [pagedata, setpagedata] = useState<SinglePageContent>(props.pagecontent)
    const [components, setcomponents] = useState<GeneralProps[]>([])

    useEffect(()=>{
        setpagedata(props.pagecontent)
        if(props.pagecontent && props.pagecontent.Componentlist){
            try{
                const json_complist = JSON.parse(props.pagecontent.Componentlist)
                let componentslist: GeneralProps[] = [];
                json_complist.forEach((x:GeneralProps)=>{
                    componentslist.push({
                        ...x,
                        _uid: uuid.v4()
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
            {components.map((block:GeneralProps) => ComponentCreator(block))}
        </div>
    )
}

export default PageView