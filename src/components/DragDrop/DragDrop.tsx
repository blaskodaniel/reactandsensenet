import React, { useState, useEffect } from "react";
import { GeneralProps } from "../../Types";
import "./DragDrop.style.scss"
import { useLocalization } from "../../hooks/use-localization";
import { DragDropContext, DropResult, Droppable, Draggable } from "react-beautiful-dnd";
import { useSetting } from "../../hooks/use-settings";
import { useComponentSetting } from "../../hooks/use-componentsettings";
import Grid from "@material-ui/core/Grid";
import styled from "styled-components";

const Container = styled.div`
    display: flex
`
const Paragraph = styled.p`
    margin-bottom: 0px;
    margin-left: ${(props:{isDragging: boolean}) => (props.isDragging ? "20px" : "8px")}
`
const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
`

export interface IDragDropComponent extends GeneralProps {
  settingname?: string,
  length: number
}
const DragDrop = (props: IDragDropComponent) => {
  const localization = useLocalization(); // Localization
  const settings = useSetting(); // Main settings
  const componentsettings = useComponentSetting(props.settingname); // Component settings
  const [data, setdata] = useState();
  const [list, setlist] = useState(Array.from(Array(props.length).keys()))

  useEffect(() => {
    try {
      if (props) {
        setdata(props);
      }
    } catch (ex) {
      console.log("Error in component", ex.message);
    }
  }, [props]);

  const dragEndHandler = (result: DropResult) => {
    console.log("DRAG END: ",result)
    const {destination, source, draggableId} = result;

  }

  const dragStartHandler = (result: DropResult) => {
    console.log("DRAG START: ",result)
    const {destination, source, draggableId} = result;
  }

  const dragUpdateHandler = (result: DropResult) => {
    console.log("DRAG UPDATE: ",result)
    const {destination, source, draggableId} = result;
  }

  return (
    <div className="component-dragdrop">
        <Grid container>
            <Grid item>
                <p>
                <a href={"https://github.com/atlassian/react-beautiful-dnd"}>react-beautiful-dnd library</a>
                </p>
            </Grid>
        </Grid>
        <DragDropContext onDragEnd={dragEndHandler} onDragStart={dragStartHandler} onDragUpdate={dragUpdateHandler}>
            <Droppable droppableId={"543634"}>
                {(provided, snapshot) => (
                    <Grid container spacing={2}
                        innerRef={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {list.map((x:number,i: number) => {
                            return (
                                <Draggable draggableId={x.toString()} index={i} key={i}>
                                    {(provided, snapshot) => (
                                        <Grid 
                                            className={snapshot.isDragging ? "draggingbox" : "box"}
                                            item xs={12}
                                            {...provided.draggableProps}
                                            innerRef={provided.innerRef}
                                        >
                                            <Container>
                                                <Handle {...provided.dragHandleProps} />
                                                <Paragraph isDragging={snapshot.isDragging}>I am a droppable! value: {x}, index: {i}</Paragraph>
                                            </Container>
                                            
                                        </Grid>
                                    )}
                                    
                                </Draggable>
                            )
                        })}
                    </Grid>
                )}
            </Droppable>
        </DragDropContext>
    </div>
  );
};

export default DragDrop;
