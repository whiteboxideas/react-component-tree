import PubSub from 'pubsub-js';
import { ACTIONS } from "../actions";
import { PubSubEvents } from '../constants/PubSubEvents';
import { renderProvider } from "../pages/sidebar";
import { INode } from "../Tree";

export default class Navigation {
    static moveUp(node: INode) {
        const index = Math.max(node.index - 1, 0);
        Navigation.move(index);
    }

    static moveDown(node: INode) {
        const index = Math.min(node.index + 1, renderProvider.data.length - 1);
        Navigation.move(index);
    }
    private static move(index: number) {
        const node = renderProvider.data[index];
        renderProvider.dispatch({
            type: ACTIONS.UPDATE_FOCUSSED_NODE,
            payload: node.id
        });
        PubSub.publish(PubSubEvents.SCROLL_TO_NODE, node.id);
    }
}