import React, { useContext, useRef } from 'react'
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ListChildComponentProps } from 'react-window'
import { DispatchContext, renderProvider, StateContext } from '../../../pages/sidebar';
import { INode } from '../../../Tree';
import InfoPanel from './InfoPanel';
import { useKeyBindings } from '../../../hooks/useKeyBindings';


const Node: React.FC<ListChildComponentProps<INode[]>> = ({
    data,
    index,
    style
}) => {
    const node = data[index];

    const { activeNode, focussedNode } = useContext(StateContext);
    const nodeRef = useRef<HTMLDivElement>(null);
    const dispatch = useContext(DispatchContext);


    const toggleNode = (e) => {
        e.stopPropagation();
        renderProvider.toggleNode(node);
    };

    const onClick = () => {
        if (!node.thirdParty) {
            dispatch({
                type: "UPDATE_ACTIVE_NODE",
                payload: node.id
            });
            viewFile();
        }
    }
    const paddingLeft = 15 * node.level;
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
            // since we call 
            setTimeout(() => {
                // console.log(document.querySelector('.sidebar'))
                (document.querySelector('.sidebar') as HTMLDivElement)?.click?.();
            }, 3000);
        }
    };

    return (
        <div ref={nodeRef} onClick={onClick} className={classNames('node-container', {
            selected: activeNode === node.id,
            focussed: focussedNode === node.id
        })} style={style} >
            <div className={`node`} style={indentationStyle}>
                {node.children.length ?
                    <FontAwesomeIcon className='expand-toggle' icon={node.expanded ? faChevronDown : faChevronRight} onClick={toggleNode} /> :
                    <span className='expand-toggle'></span>}
                <InfoPanel node={node}></InfoPanel>
                <span title='Navigates to that file' className={`node-label ${node.thirdParty ? 'third-party' : ''}`}>{node.name}</span>
            </div>
        </div>
    );
};



export default Node;