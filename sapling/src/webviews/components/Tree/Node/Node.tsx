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

    const toggleNode = () => {
        renderProvider.toggleNode(node);
    };

    const paddingLeft = 10 * node.level;
    const indentationStyle: React.CSSProperties = {
        paddingLeft
    }
    return (
        <div style={style} >
            <div className='node' style={indentationStyle}>
                {node.children.length ? <FontAwesomeIcon className='expand-toggle' icon={node.expanded ? faChevronDown : faChevronRight} onClick={toggleNode} /> : null}
                <InfoPanel node={node}></InfoPanel>
            <span className='node-label'>{node.name}</span>
            </div>
        </div>
    );
};

export default Node;