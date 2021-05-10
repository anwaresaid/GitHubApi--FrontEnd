

function RepoDetails({details}){
    return(
        <div className="repo-details-container">
            <div className="details-row">
                <label className="label">Name :</label>
                <span className="value">{details.name}</span>
            </div>
            <div className="details-row">
                <label className="label"> Full Name :</label>
                <span className="value">{details.full_name}</span>
            </div>
            <div className="details-row">
                <label className="label"> Fork Count:</label>
                <span className="value">{details.forks}</span>
            </div>
            <div className="details-row">
                <label className="label"> Language:</label>
                <span className="value">{details.language}</span>
            </div>
            <div className="details-row">
                <label className="label"> Stars:</label>
                <span className="value">{details.stargazers_count}</span>
            </div>
            <div className="details-row">
                <label className="label"> size :</label>
                <span className="value">{details.size}</span>
            </div>
            <div className="details-row">
                <label className="label"> Pushed at :</label>
                <span className="value">{details.pushed_at}</span>
            </div>
            <div className="details-row">
                <label className="label"> Subscribers :</label>
                <span className="value">{details.subscribers_count}</span>
            </div>
        </div>
    )
}

export default RepoDetails;