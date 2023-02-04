import React, { ComponentType, useEffect } from "react"
import Edge from "../Components/Edge";
import DefaultEdge from "../Components/Edge/DefaultEdge"
import { useStore } from "../Hooks/useStore"
import { IGraphState, IHandle } from "../Types"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface EdgeTypeProps {
  sourceHandle: IHandle;
  targetHandle: IHandle;
}

const selector = (s: IGraphState) => ({
  customEdgeTypes: s.customEdgeTypes,
  edges: s.edgeInternals,
  handleInteraction: s.handleInteraction,
  addEdge: s.addEdge,
  getHandle: s.getHandle,
  resetHandleInteraction: s.resetHandleInteraction
});


export const EdgeRenderer = () => {
  const { customEdgeTypes, edges, handleInteraction, addEdge, getHandle, resetHandleInteraction} = useStore(selector)
  const edgeTypes: { [key: string]: ComponentType<EdgeTypeProps> } = {...{default: DefaultEdge}, ...customEdgeTypes}

  useEffect(() => {
    if(handleInteraction !== undefined){
      const {sourceHandle: source, targetHandle: target, edgeType} = handleInteraction
      if(source !== undefined && target !== undefined){
        const edgeId = `edge-${source.id}-${target?.id}`
        const existingEdge = edges.get(edgeId)

        if(existingEdge === undefined){
          addEdge([{item: {id: edgeId, sourceNodeId: source.nodeId, sourceNodeOutput: source.id, targetNodeId: target.nodeId, targetNodeInput: target.id, type: edgeType}}])
        }
        resetHandleInteraction()
      }
      
    }
  },[edges,handleInteraction, addEdge, resetHandleInteraction])


  return (
    <svg width={'100%'} height={'100%'} overflow="visible" style={{position: "absolute"}} >
      {[...edges.values()].map((edge, index) => {
        const EdgeType = edgeTypes[edge.type] as ComponentType<EdgeTypeProps> || edgeTypes['default'];

        const source = getHandle(edge.sourceNodeId, edge.sourceNodeOutput);
        const target = getHandle(edge.targetNodeId, edge.targetNodeInput);

      if(source && target){
        return (
          <Edge 
            key={index} 
            edge={edge} 
            source={source} 
            target={target}
          >
            <EdgeType
              sourceHandle={source}
              targetHandle={target}
            />
          </Edge>
        )
      }
      })}
    </svg>
  )
}

export default EdgeRenderer