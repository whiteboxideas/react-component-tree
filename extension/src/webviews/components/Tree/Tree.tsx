import React, { useContext, useEffect, useRef } from 'react';
import { FixedSizeList } from 'react-window';
import { renderProvider, StateContext } from '../../pages/sidebar';
import { INode } from '../../Tree';
import Node from './Node/Node';

interface IProps {
}
const Tree: React.FC<IProps> = () => {

    const height = document.body.clientHeight;
    const width = document.body.clientWidth - 10;

    const { rows } = useContext(StateContext);
    const listRef: React.LegacyRef<FixedSizeList<INode[]>> = useRef(null);

    useEffect(() => {
        // Event Listener for 'message' from the extension
        window.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === "onActiveTextEditor") {
                const node = renderProvider.filePathMap.get(message.value);
                if (node) {
                    listRef.current?.scrollToItem(node.index, "smart");
                }
            }
        })
    }, [])

    return (<FixedSizeList
        ref={listRef}
        height={height}
        itemCount={rows.length}
        itemSize={30}
        width={width}
        itemData={rows}
        className="tree"
    >
        {Node}
    </FixedSizeList>);
};



const findNodeId = (filePath: string, nodes: any[]) => {
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {

        const node = nodes[nodeIndex];
        if (node?.filePath === filePath) {
            return node?.id;
        } else {
            if (node?.children?.length) {
                const id = findNodeId(filePath, node.children);
                if (id) {
                    return id;
                }
            }

        }

    }
}

export default Tree;