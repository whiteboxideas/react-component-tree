import { INode, Tree } from "../Tree";

type TExpandCollapse = Record<string, boolean>;

export default class RenderProvider {

    rawTree: INode;
    data: INode[];
    expandCollapseConfig: TExpandCollapse = {};
    filePathMap: Map<string, INode> = new Map();
    dispatch;

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
        this.populateData([this.rawTree]);
        return this.data;
    }

    populateData(nodes: INode[]) {
        nodes.forEach(node => {
            const expanded = !!node?.children?.length && this.isRowExpanded(node);
            if (node) {
                const processedNode = this.getProcessedNode(node, expanded);
                this.data.push(processedNode);
                this.filePathMap.set(processedNode.filePath, processedNode);
            }

            if (expanded) {
                this.populateData(node.children);
            }
        });
    }

    getProcessedNode(node: any, expanded: boolean) {
        return {
            ...node,
            level: node.depth,
            index: this.data.length,
            expanded
        }
    }

    isRowExpanded(node: any): boolean {
        if (node.id in this.expandCollapseConfig) {
            return this.expandCollapseConfig[node.id];
        } else if (node.depth === 0) {
            return true;
        }
        return false;
    }

    toggleNode(node: INode) {
        this.expandCollapseConfig = {
            ...this.expandCollapseConfig,
            [node.id]: !node.expanded
        };
        this.updateNodes();
    }

    updateNodes() {
        this.parseNodes();
        this.dispatch({
            type: "UPDATE_DATA",
            payload: this.data
        })
    }


}

/**
 * Todo 

- scroll to node on file change - done
- search 
- check if flow is performant 
- implement line connectors
- persist context data 
 */