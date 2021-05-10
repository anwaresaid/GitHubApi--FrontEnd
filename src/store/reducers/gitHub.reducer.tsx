import { gitHubRepoTypes } from "../types/githubRepo.types";

const initialState:any = [];

export const listGitHubRepoReducer = (state = initialState, action:any) => {
  switch (action.type) {
    case gitHubRepoTypes.GITHUB_REPO_LIST_REQUEST:
      return { loading: true}
    case gitHubRepoTypes.GITHUB_REPO_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        repos: action.payload
      }

    case gitHubRepoTypes.GITHUB_REPO_LIST_FAIL:
      return {
        loading: false,
        error: action.payload
      } 
      
    default:
      return state;
  }
};

