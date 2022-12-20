import React from "react"
import { ComponentType, createElement, Key } from "react"
import DefaultNode from "./defaultNode"
import Draggable from "./draggable"
import { EdgeRenderer } from "./edgeRenderer"
import { useNodeStore } from "./stores/nodeStore"

interface NodeRendererProps {
  nodeList?: any
  edgeList?: any
  customNodeTypes?: any
}
export const NodeRenderer = ({nodeList, customNodeTypes, edgeList}: NodeRendererProps) => {
  const nodes = useNodeStore((state) => state.nodes);
  const nodeTypes: { [key: string]: ComponentType<any> } = {default: DefaultNode}

  return (
    <div style={{position: 'relative', display: 'flex'}}>
        {nodes.map(node => {
          const NodeType = nodeTypes[node.type] as ComponentType<any> || nodeTypes['default']
          return(
            <NodeType key={node.id} node={node}/>
          )
        })}
        <EdgeRenderer></EdgeRenderer>
    </div>
  )
}

export default NodeRenderer