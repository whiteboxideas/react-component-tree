import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sidebar from '../components/Sidebar';
import '../../../media/styles.css';
import RenderProvider from '../service/RenderProvider';
import { ACTIONS } from '../actions';
import { INode, IAction, RootState } from '../../types';

export const renderProvider = new RenderProvider();

const initialState: RootState = {
    search: '',
    rows: [],
    activeNode: null,
    focussedNode: null,
};


const StateContext = React.createContext<RootState>(null);
const DispatchContext = React.createContext<any>(null);

function reducer(state: RootState, action: IAction): RootState {
    switch (action.type) {
        case ACTIONS.UPDATE_SEARCH: {
            return {
                ...state,
                search: action.payload
            };
        }
        case ACTIONS.UPDATE_DATA: {
            return {
                ...state,
                rows: action.payload
            };
        }
        case ACTIONS.UPDATE_ACTIVE_NODE: {
            return {
                ...state,
                activeNode: action.payload,
                focussedNode: action.payload
            };
        }
        case ACTIONS.UPDATE_FOCUSSED_NODE: {
            return {
                ...state,
                focussedNode: action.payload
            };
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
const App = () => {

    const [state, dispatch] = React.useReducer(reducer, initialState);
    renderProvider.dispatch = dispatch;


    return <StateContext.Provider value={state} >
        <DispatchContext.Provider value={dispatch} >
            <Sidebar />
        </DispatchContext.Provider>
    </StateContext.Provider>;
};

ReactDOM.render(<App />, document.getElementById('root'));

export {
    StateContext,
    DispatchContext
};
