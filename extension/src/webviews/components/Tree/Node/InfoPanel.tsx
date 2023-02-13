import * as React from 'react';
import { Fragment } from 'react';

// imports for the icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faInfoCircle, } from '@fortawesome/free-solid-svg-icons';
// imports for the tooltip
import Tippy from '@tippy.js/react';
import 'tippy.js/dist/tippy.css';
import { INode } from '../../../../types';

interface IProps {
    node: INode;
}
const InfoPanel: React.FC<IProps> = ({
    node
}: IProps) => {
    // Function that generates the props for each node
    const propsGenerator = () => {
        // Case when there are no props present on the node
        if (Object.keys(node.props).length === 0) {
            return <p>None</p>;
        }
        // Case when there are props to loop through on the node
        return Object.keys(node.props).map(prop => {
            return <p>{prop}</p>;
        });
    };

    // Variable that holds the props that will be fed into the tooltip (Tippy)
    const propsList = propsGenerator();

    return (
        <>
            {node.redux ?
                <Tippy content={<p><strong>Connected to Redux Store</strong></p>}>
                    <span className="redux_connect" ><FontAwesomeIcon icon={faStore} /></span>
                </Tippy>
                : null}
            <Tippy content={<p><strong>Props</strong>{propsList}</p>}>
                <span className="node_icons" ><FontAwesomeIcon icon={faInfoCircle} /></span>
            </Tippy>
        </>
    );
};

export default InfoPanel;