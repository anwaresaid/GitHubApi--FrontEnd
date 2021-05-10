import { gitHubRepoTypes } from "../types/githubRepo.types";
import axios from 'axios';




export const listRepos = (username:any) => async (dispatch:any) => {
    try {
      dispatch({
        type: gitHubRepoTypes.GITHUB_REPO_LIST_REQUEST,
      });
  
      const { data } = await axios.get(`https://api.github.com/users/${username}/repos`);
      console.log("dispatch data",data);
      dispatch({
        type: gitHubRepoTypes.GITHUB_REPO_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: gitHubRepoTypes.GITHUB_REPO_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };