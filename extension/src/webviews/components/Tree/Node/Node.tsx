import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { ListChildComponentProps } from 'react-window'
import { renderProvider } from '../../../pages/sidebar';
import { INode } from '../../../Tree';
import InfoPanel from './InfoPanel';


const Node: React.FC<ListChildComponentProps<INode[]>> = ({
    data,
    index,
    style
}) => {
    const node = data[index];

    const toggleNode = (e) => {
        e.stopPropagation();
        renderProvider.toggleNode(node);
    };

    const paddingLeft = 10 * node.level;
    const indentationStyle: React.CSSProperties = {
        paddingLeft
    }
      // Function that will capture the file path of the current node clicked on + send a message to the extension
      const viewFile = () => {
        // Edge case to verify that there is in fact a file path for the current node
        if (node.filePath) {
            vscodeApi.postMessage({
                type: "onViewFile",
                value: node.filePath
            });
        }
    };

    return (
        <div style={style} >
            <div onClick={viewFile} className='node' style={indentationStyle}>
                {node.children.length ? <FontAwesomeIcon className='expand-toggle' icon={node.expanded ? faChevronDown : faChevronRight} onClick={toggleNode} /> : null}
                <InfoPanel node={node}></InfoPanel>
            <span className='node-label'>{node.name}</span>
            </div>
        </div>
    );
};

export default Node;