import * as React from 'react'
import { Fragment } from 'react';

// imports for the icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStore, faInfoCircle, faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
// imports for the tooltip
import Tippy from '@tippy.js/react'
import 'tippy.js/dist/tippy.css';

const InfoPanel = ({
    node
}: {
    node: any
}) => {
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
    // Variable that holds the props that will be fed into the tooltip (Tippy)
    const propsList = propsGenerator();

    {/* Checks to make sure there are no thirdParty or reactRouter node_icons */ }
    return (
        !node.thirdParty && !node.reactRouter ? (
            <Fragment>
                {node.reduxConnect ?
                    <Tippy content={<p><strong>Connected to Redux Store</strong></p>}>
                        <a className="redux_connect" href=""><FontAwesomeIcon icon={faStore} /></a>
                    </Tippy>
                    : null}
                <Tippy content={<p><strong>Props available:</strong>{propsList}</p>}>
                    <a className="node_icons" href=""><FontAwesomeIcon icon={faInfoCircle} /></a>
                </Tippy>
                <a className="node_icons" href="" onClick={viewFile}><FontAwesomeIcon icon={faArrowCircleRight} /></a>
            </Fragment>
        ) : null
    )
}

export default InfoPanel