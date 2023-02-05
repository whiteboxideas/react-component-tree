import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Sidebar from '../components/Sidebar';
import '../../../media/styles.css';
import RenderProvider from '../service/RenderProvider';
import { INode } from '../Tree';

export const renderProvider = new RenderProvider();

export interface RootState {
    search: string;
    rows: INode[];
    activeNode: string
}

const initialState: RootState = {
    search: '',
    rows: [],
    activeNode: null,
};


const StateContext = React.createContext<RootState>(null);
const DispatchContext = React.createContext<any>(null);

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE_SEARCH': {
            return {
                ...state,
                search: action.payload
            }
        }
        case 'UPDATE_DATA': {
            console.log('update',action.payload)
            return {
                ...state,
                rows: action.payload
            }
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
