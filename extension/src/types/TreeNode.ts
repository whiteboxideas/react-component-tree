export interface IRawNode {
  id: string;
  name: string;
  parent: INode;
  children: INode[];
  parentList: string[];
  error: string;
  props: Record<string, any>;
  expanded: boolean;
  redux: boolean;
  thirdParty: boolean;
  filePath: string;
  importPath: string;
}

export interface INode extends IRawNode {
  index: number;
  depth: number;
}
