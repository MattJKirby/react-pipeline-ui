import React, { memo, useRef } from "react"
import NodeDataContext from "../../Contexts/NodeDataContext"
import { IXYPosition } from "../../Types";
import { nodeSelectHandler } from "./utils";
import { useStoreApi } from "../../Hooks/useStoreApi";
import useDrag from "../../Hooks/useDrag";

export interface NodeContainerProps {
  children: React.ReactNode;
  id: string;
  type: string;
  position: IXYPosition;
  selected: boolean;
  enableSelect: boolean;
  enableDrag: boolean;
  selectOnDrag: boolean;
}

const Node = ({
  children, 
  id,
  position,
  enableSelect,
  enableDrag,
  selectOnDrag
  
}: NodeContainerProps) => {
  const store = useStoreApi();
  const nodeRef = useRef<HTMLDivElement>(null);
  const dragging = useDrag({store: store, nodeId: id, nodeRef: nodeRef, position: position, disabled: !enableDrag, selectOnDrag: selectOnDrag});
  
  return (
    <NodeDataContext.Provider value={{
      id: id, 
      position: position
    }}>
      <div
        ref={nodeRef}
        style={{transform: `translate(${position.x}px, ${position.y}px)`, position: 'fixed', userSelect: "none"}}
        onClickCapture={() => nodeSelectHandler({id: id, store: store, disabled: !enableSelect})}
        >
        {children}
      </div>
    </NodeDataContext.Provider>
  )
}

export default memo(Node)