import * as React from "react";
import { useEffect, useState } from "react";
// import { Tree as TreeType } from '../../parser';

// component imports
import Navbar from "./Navbar";
import SearchBar from "./SearchBar";
import Tree from "./Tree/Tree";

const Sidebar = () => {
  const [rootFile, setRootFile] = useState<string>();

  useEffect(() => {
    // Post message to the extension whenever sapling is opened
    vscodeApi.postMessage({
      type: "onSaplingVisible",
      value: null,
    });

    // Post message to the extension for the user's settings whenever sapling is opened
    vscodeApi.postMessage({
      type: "onSettingsAcquire",
      value: null,
    });
  }, []);

  // Render section
  return (
    <div className='sidebar'>
      <SearchBar />
      <Navbar rootFile={rootFile} />
      <Tree />
    </div>
  );
};

export default Sidebar;
