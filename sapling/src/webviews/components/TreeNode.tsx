import * as React from 'react';
import { useState, useEffect, Fragment } from 'react';
import * as ReactDOM from 'react-dom';
import InfoPanel from './InfoPanel';
// import tree for recursive calls
import Tree from './Tree';

const TreeNode = ({ node }: any) => {
  // state variables for the users current active file and the expanded value (boolean) of the node
  const [currFile, setCurrFile] = useState(false);
  const [expanded, setExpanded] = useState(node.expanded);

  // useEffect that will add an event listener for 'message' to each node, in order to show which file the user is currently working in
  useEffect(() => {
    window.addEventListener('message', (event) => {
      const message = event.data;
      switch (message.type) {
        case("current-tab"): {
          // If the current node's filePath is the same as the user's current actie window, change state to true, else, change state to false
          if (message.value === node.filePath) {
            setCurrFile(true);
          } else {
            setCurrFile(false);
          }
        }
      }
    });
   
  }, []);


  // Variable that holds the logic of whether the current node has children or not
  const child = node.children.length > 0 ? true: false;

  // onClick method for each node that will change the expanded/collapsed structure + send a message to the extension
  const toggleNode = () => {
    // Set state with the opposite of what is currently saved in state (expanded)
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    // Send a message to the extension on the changed checked value of the current node
    vscodeApi.postMessage({
        type: "onNodeToggle",
        value: {id: node.id, expanded: newExpanded}
    });
  };

  const classString = "tree_label" + (node.error ? " node_error" : "");

  // Render section
  return (
    <>
    {/* Conditional to check whether there are children or not on the current node */}
      {child ? (
        <li>
          <input type="checkbox" checked={expanded} id={node.id} onClick={toggleNode} />
          {/* Checks for the user's current active file */}
          {currFile ?
            <label className={classString} htmlFor={node.id}><strong style={{ fontWeight: 800 }}>{node.name}</strong></label>
          : <label className={classString} htmlFor={node.id}>{node.name}</label>}
          <InfoPanel node={node} />
          <Tree data={node.children} first={false} />
        </li>
      ):
      <li>
          {/* Checks for the user's current active file */}
          {currFile ?
            <span className={classString}><strong style={{ fontWeight: 800 }}>{node.name}</strong></span>
            : <span className={classString}>{node.name}</span>
          }
          <InfoPanel node={node} />
        </li>
      }
    </>
  );
};

export default TreeNode;
