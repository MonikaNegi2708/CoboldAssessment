import React from 'react';
import '../App.css';
import axios from 'axios';
class UrlList extends React.Component {

	state = {
		urlList: this.props.urlList
	}

	loadWebsite = (index, url) => {
		let urlList = JSON.parse(JSON.stringify(this.state.urlList));
		delete urlList[index].responseType;
		this.setState({ urlList }, () => {
			axios.get(url)
				.then((res) => {
					urlList[index].responseType = res.status;
					this.setState({ urlList })
				})
				.catch((error) => {
					urlList[index].responseType = error.response ? error.response.status : "404";
					this.setState({ urlList })
				});
		})
	}

	render() {
		return <div>
			<h6 className="header">WEBSITES</h6>
			{this.state.urlList.length > 0 ?
				<ul className="website-list-content">
					{this.state.urlList.map((el, index) => <li key={index} className={el.responseType && el.responseType !== 200 ? "error-list" : ""} onClick={() => this.loadWebsite(index, el.url)}>
						<div className="website-info">
							<p>{el.url}</p>
						</div>
						<div className="website-status">
							<p>Last checked: 5 minutes ago</p>
							<button type="button"
								className={el.responseType ? el.responseType === 200 ? "button-status bg-green" : "button-status bg-red" : "button-status bg-blue"}
							>
								{el.responseType ? el.responseType === 200 ? "LIVE" : "ERROR" : "FETCHING"}
							</button>
						</div>
					</li>)}
				</ul>
				: <h5>No websites yet !</h5>
			}
			<div className="website-content-footer">
				<h6 className="list-explanation">This application is a test. It lets users add a list of URLs in local storage. The application then fetches the contents of each URL and checks the response type. If the response when getting the contents of the website throws an error, the application highlights the errored website in the list, otherwise is marks the URL as LIVE. The application does this every 5 minutes or on demand for a single website when the URL is clicked by the user. On reload, the website checks the local storage for the list of websites added and loads all of them.</h6>
				<p className="candidate-name">Built for Cobold Digital by Monika Negi</p>
			</div>
		</div >
	}
}

export default UrlList;
