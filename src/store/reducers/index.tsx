import { combineReducers } from "redux";
import {listGitHubRepoReducer} from "../reducers/gitHub.reducer"

const rootReducer =  combineReducers({
    listGitHub : listGitHubRepoReducer
});

export default rootReducer;