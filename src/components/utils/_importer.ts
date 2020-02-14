import React from "react";
import Components from "./_components";

export interface IBlock {
  _uid: string;
  component: string;
  property?: string;
}

const ComponentCreator = (block:any) => {
  let isCompexist = Components.find(x=> x.name.trim().toLowerCase() === block.component.trim().toLowerCase());
  if (isCompexist) {
    return React.createElement(isCompexist.component as any, {
        key: block._uid,
        properties: block
      });
  }
  return null;
};

export default ComponentCreator