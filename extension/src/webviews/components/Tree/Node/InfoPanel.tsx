import * as React from "react";
import { Fragment } from "react";

// imports for the icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStore,
  faInfoCircle,
  faFish,
  faQrcode,
} from "@fortawesome/free-solid-svg-icons";
// imports for the tooltip
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { INode } from "../../../../types";

interface IProps {
  node: INode;
}
const InfoPanel: React.FC<IProps> = ({ node }: IProps) => {
  // Function that generates the props for each node
  const propsGenerator = () => {
    // Case when there are no props present on the node
    if (Object.keys(node.props).length === 0) {
      return <p>None</p>;
    }
    // Case when there are props to loop through on the node
    return Object.keys(node.props).map((prop) => {
      return <p>{prop}</p>;
    });
  };

  // Variable that holds the props that will be fed into the tooltip (Tippy)
  const propsList = propsGenerator();
  const nodeIsLocal = React.useMemo(() => {
    return node.filePath === node?.parentList[0];
  }, [node.filePath, node?.parentList[0]]);

  const isHook = React.useMemo(() => {
    console.log("InfoPanel.tsx-42: ", node.name.toString().startsWith("use"));
    return node.name.toString().startsWith("use");
  }, [node.name]);
  return (
    <>
      {node.redux ? (
        <Tippy
          content={
            <p>
              <strong>Connected to Redux Store</strong>
            </p>
          }
        >
          <span className='redux_connect'>
            <FontAwesomeIcon icon={faStore} />
          </span>
        </Tippy>
      ) : null}
      {propsList ? (
        length > 0
      ) : (
        <Tippy
          content={
            <p>
              <strong>Props</strong>
              {propsList}
            </p>
          }
        >
          <span className='node_icons'>
            <FontAwesomeIcon icon={faInfoCircle} />
          </span>
        </Tippy>
      )}
      {nodeIsLocal && (
        <Tippy
          content={
            <p>
              REFACTOR - component is defined in the same file where it is used
            </p>
          }
        >
          <span className='node_icons_warning'>
            <FontAwesomeIcon icon={faInfoCircle} />
          </span>
        </Tippy>
      )}
      {isHook ? (
        <Tippy content={<p>a hook</p>}>
          <span className='node_icons_warning'>
            <FontAwesomeIcon icon={faFish} />
          </span>
        </Tippy>
      ) : (
        <Tippy content={<p>a component</p>}>
          <span className='node_icons_warning'>
            <FontAwesomeIcon icon={faQrcode} />
          </span>
        </Tippy>
      )}
    </>
  );
};

export default InfoPanel;
