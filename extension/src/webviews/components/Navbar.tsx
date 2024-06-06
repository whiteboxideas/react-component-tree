import * as React from "react";
import { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

// imports for the icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faDownload,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { faExpandAlt } from "@fortawesome/free-solid-svg-icons";
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { renderProvider } from "../pages/sidebar";
import { ExpandedState } from "../service/RenderProvider";

const Navbar = ({ rootFile }: any) => {
  // onChange function that will send a message to the extension when the user selects a file
  const fileMessage = (e: any) => {
    const filePath = e.target.files[0].path;
    // Reset event target value to null so the same file selection causes onChange event to trigger
    e.target.value = null;
    if (filePath) {
      vscodeApi.postMessage({
        type: "onFile",
        value: filePath,
      });
    }
  };

  const goBack = () => {
    vscodeApi.postMessage({
      type: "goBack",
    });
  };

  const expandAll = () =>
    renderProvider.setGridExpandedState(ExpandedState.EXPANDED);

  const collapseAll = () =>
    renderProvider.setGridExpandedState(ExpandedState.COLLAPSED);

  // Render section
  return (
    <div className='navbar'>
      <input
        type='file'
        name='file'
        id='file'
        className='inputfile'
        onChange={(e) => {
          fileMessage(e);
        }}
      />
      {/* <label htmlFor='file'>
        <FontAwesomeIcon icon={faDownload} />
        <strong id='strong_file'>
          {rootFile ? ` ${rootFile}` : " Choose a file..."}
        </strong>
      </label> */}
      <div className='expand-collapse-buttons'>
        <span>
          <FontAwesomeIcon title='Back' icon={faBackward} onClick={goBack} />
        </span>
        <span>
          <FontAwesomeIcon
            title='Expand All'
            icon={faExpandAlt}
            onClick={expandAll}
          />
        </span>
        <span>
          <FontAwesomeIcon
            title='Collapse All'
            icon={faCompressAlt}
            onClick={collapseAll}
          />
        </span>
      </div>
    </div>
  );
};

export default Navbar;
