import React from "react";
import Components from "./_registeredComponents";
import { GeneralProps } from "../../Types";

const ComponentCreator = (block:GeneralProps) => {
  let isCompexist = Components.find(x=> x.name.trim().toLowerCase() === block.component.trim().toLowerCase());
  if (isCompexist) {
    return React.createElement(isCompexist.component as any, {
        key: block._uid,
        ...block
      });
  }
  return null;
};

export default ComponentCreator