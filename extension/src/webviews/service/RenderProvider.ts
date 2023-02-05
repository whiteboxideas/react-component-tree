import { INode, IRawNode, Tree } from "../Tree";

type TExpandCollapse = Record<string, boolean>;

export default class RenderProvider {

    rawTree: INode;
    data: INode[] = [];
    expandCollapseConfig: TExpandCollapse = {};
    filePathMap: Map<string, INode> = new Map();
    dispatch;
    searchString: string = '';

    constructor() {
        window.addEventListener('message', (event) => {
            const message = event.data;
            switch (message.type) {

                // Listener to receive the tree data, update navbar and tree view
                case ("parsed-data"): {
                    this.rawTree = message.value;
                    this.updateNodes();
                    break;
                }

                case ("settings-data"): {
                    break;
                }

            }
        });

    }

    parseNodes(rawTree: INode = this.rawTree) {
        this.rawTree = rawTree;
        this.data = [];
        const result = this.filterData([this.rawTree]);
        this.flattenData(result);
    }

    filterData = (nodes: INode[]) => {
        const { searchString, getProcessedNode } = this;
        return handler(nodes);
        function handler(nodes: INode[]) {
            return nodes.reduce((acc: INode[], node) => {
                const hasChildren = !!node?.children?.length;
                if (node) {
                    const processedNode = getProcessedNode(node);
                    if (hasChildren) {
                        processedNode.children = handler(node.children);
                    }
                    if (!processedNode.children?.length) {
                        // ignore node if it doesn't match the search string 
                        if (satisfiesSearch(processedNode)) {
                            acc.push(processedNode);
                        }
                    } else {
                        // Add node anyways
                        acc.push(processedNode);
                    }
                }
                return acc;
            }, []);
        }

        function satisfiesSearch(node) {
            if (node.children?.length || !searchString) {
                return true;
            } else {
                return node.name.toLowerCase().includes(searchString.toLowerCase());
            }
        }
    };

    getProcessedNode = (node: any) => {
        return {
            ...node,
            level: node.depth,
            expanded: this.isRowExpanded(node),
            children: []
        };
    };

    flattenData(nodes: INode[]) {
        nodes.forEach(node => {
            const hasChildren = !!node?.children?.length;
            if (node) {
                node.index = this.data.length;
                this.data.push(node);
                this.filePathMap.set(node.filePath, node);
            }

            if (hasChildren && node?.expanded) {
                this.flattenData(node.children);
            }
        });
    }

    isRowExpanded = (node: any): boolean => {
        if (node.id in this.expandCollapseConfig) {
            return this.expandCollapseConfig[node.id];
        } else if (node.depth === 0) {
            return true;
        }
        return false;
    };

    toggleNode(node: INode) {
        this.expandCollapseConfig = {
            ...this.expandCollapseConfig,
            [node.id]: !node.expanded
        };
        this.updateNodes();
    }

    search(searchString: string) {
        this.searchString = searchString;
        this.updateNodes();
    }

    updateNodes = () => {
        this.parseNodes();
        this.dispatch({
            type: "UPDATE_DATA",
            payload: this.data
        });
    }


}

/**
 * Todo 

- scroll to node on file change - done
- search 
- check if flow is performant 
- implement line connectors
- persist context data - done
- highlight active tab
- navigate to file on click
 */