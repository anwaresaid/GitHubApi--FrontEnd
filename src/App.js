import {useState,useEffect} from 'react';
import axios from 'axios';
import RepoDetails from './components/RepoDetails';
import logo from './github.png'
import './App.css';

import {listRepos} from './store/actions/gitHub.action';
import {useDispatch,useSelector} from 'react-redux';


function App() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [errorName, setErrorName] = useState(true);
  const [bookmarks, setBookmarks] = useState([{}]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const dispatch = useDispatch();
  const reposRedux = useSelector((state) => state.listGitHub);
  const {loading: reduxLoding ,success, repos } = reposRedux

  useEffect(() => {
    setDetails([]);
    setErrorName(true);
    setShowBookmarks(false);
  }, [username]);

  const handleBookmarks = (e) =>{
    e.preventDefault();
    setShowBookmarks(true);
  }
  const dispatchBookmarks = (payload) => {

    let oldBookmarks = bookmarks;
    let check = oldBookmarks.filter(repo => repo.id === payload.id);
    if(check.length===0)
    {
    let newBookmarks = [...oldBookmarks, payload];
    setBookmarks(newBookmarks);
    }
  }
  function handleSubmit(e){
    e.preventDefault();
    setShowBookmarks(false);
    dispatch(listRepos(username));
  };
  function conditionalRendering(){
    if(errorName)
    {
      return (
        <div className="results-container">
            { showBookmarks? bookmarks.map(bookmark => renderRepo(bookmark)): success? repos.map(repo =>renderRepo(repo)): <></>}
          </div>
      )
    }
    return(
      <div className="error-message">
        cannot find this name
      </div>
    )
  }

  function renderRepo(repo){

    if(!showBookmarks)
    return(  
        <div className= "row" onClick={()=>getDetails(repo.name)} key = {repo.id}>
          <h2 className="repo-name">
            {repo.name}
          </h2> 
          <button className="bookMark" 
            onClick= {() => dispatchBookmarks(repo)}>bookMark</button>
        </div>
    )
    return(
      <div className= "row" onClick={()=>getDetails(repo.name)} key = {repo.id}>
      <h2 className="repo-name">
        {repo.name}
      </h2> 
    </div>
    )
  }
  function getDetails(repoName){
    setDetailsLoading(true);
    axios({
      method:"get",
      url: `https://api.github.com/repos/${username}/${repoName}`,
    }).then(res =>{
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }
  return (
      <div className="landing-page-container">
        <img className="logo" src={logo} alt = "Logo"/>
        <div className="left-side">
          <form>
            {console.log("bookmarks", bookmarks)}
            <input
              className="input"
              value= {username}
              placeholder= "GitHub Username"
              onChange={e=> setUsername(e.target.value)}
              />
            <button className="button" 
            onClick= {handleSubmit }>{loading? "searching ...":"Search" }</button>
             <button className="button" 
            onClick={handleBookmarks }>show bookmarks</button>
          </form>
            {conditionalRendering()}
        </div>
        <RepoDetails details = {details} loading = {detailsLoading}/>
      </div>
  );
}

export default App;
