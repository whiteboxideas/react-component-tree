import * as _vscode from "vscode";
import { WebviewApi } from "vscode-webview";

declare global {
  const vscodeApi: WebviewApi<unknown>
}

export default vscodeApi;