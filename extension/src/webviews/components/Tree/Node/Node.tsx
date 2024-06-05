import React, { useContext, useRef } from "react";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { ListChildComponentProps } from "react-window";
import { renderProvider, StateContext } from "../../../pages/sidebar";
import { INode } from "../../../../types";
import InfoPanel from "./InfoPanel";

const Node: React.FC<ListChildComponentProps<INode[]>> = ({
  data,
  index,
  style,
}) => {
  const node = data[index];

  const { activeNode, focusedNode } = useContext(StateContext);
  const nodeRef = useRef<HTMLDivElement>(null);

  const toggleNode = (e) => {
    e.stopPropagation();
    renderProvider.toggleNode(node);
  };

  const onClick = () => {
    renderProvider.visitNode(node);
  };
  const paddingLeft = 15 * node.depth;
  const indentationStyle: React.CSSProperties = {
    paddingLeft,
  };
  const isNodeLocal = React.useMemo(() => {
    return node.filePath === node?.parentList[0];
  }, [node.filePath, node?.parentList[0]]);
  const isFromReact = React.useMemo(() => {
    console.log("Node.tsx-39: node", node);
    console.log(
      'Node.tsx-39: node.importPath.includes("react")',
      node.importPath.includes("react")
    );
    return node.importPath.includes("react");
  }, [node.importPath]);
  return (
    <div
      ref={nodeRef}
      onClick={onClick}
      className={classNames("node-container", {
        selected: activeNode === node.id,
        focused: focusedNode === node.id,
      })}
      style={style}
    >
      <div className={`node`} style={indentationStyle}>
        {node.children.length ? (
          <FontAwesomeIcon
            className='expand-toggle'
            icon={node.expanded ? faChevronDown : faChevronRight}
            onClick={toggleNode}
          />
        ) : (
          <span className='expand-toggle'></span>
        )}
        <InfoPanel node={node}></InfoPanel>
        <span
          title='Navigates to that file'
          className={`node-label ${node.thirdParty ? "third-party" : ""} ${
            isNodeLocal ? "local-component" : ""
          } ${isFromReact ? "react-component" : ""}`}
        >
          {node.name}
        </span>
      </div>
    </div>
  );
};

export default Node;
