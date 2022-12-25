import React from "react"
import { useNodeContext } from "../../Contexts/NodeDataContext";
import { Handle } from "../Handle";
import { INodeData } from "./INodeData";

const DefaultNode = () => {
  const node = useNodeContext() as INodeData

  return (
    <div style={{userSelect: "none"}}>
      {node.name}
      <Handle id="source"/>
    </div>
  )
}

DefaultNode.displayName = 'DefaultNode';

export default DefaultNode