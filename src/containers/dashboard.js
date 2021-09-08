import React from 'react';
import UrlList from './urlList';
import axios from 'axios';
import '../App.css';

class Dashboard extends React.Component {
	state = {
		url: "",
		urlList: [],
	}

	componentWillMount() {
		this.getUrlResponse();
		setInterval(this.getUrlResponse, 300000);
	}

	getUrlResponse = () => {
		if (localStorage.urlList) {
			let urlList = [];
			JSON.parse(localStorage.urlList).map(url => {
				axios.get(url)
					.then((res) => {
						urlList.push({ url: url, responseType: res.status });
						this.setState({ urlList })
					})
					.catch((error) => {
						urlList.push({ url: url, responseType: error.response ? error.response.status : "404" });
						this.setState({ urlList })
					});
			})
		}
	}

	onChangeHandler = (e) => {
		this.setState({ url: e.target.value })
	}

	addWebsiteHandler = () => {
		let tempUrlList = localStorage.getItem("urlList") ? JSON.parse(localStorage.getItem('urlList')) : [];
		tempUrlList.push(this.state.url);
		localStorage.setItem('urlList', JSON.stringify(tempUrlList));
		this.setState({ url: "" }, () => this.getUrlResponse())
	}

	render() {
		return <div className="app-body">
			<div className="content-header">
				<input placeholder="Input with URL validation" onChange={this.onChangeHandler} value={this.state.url} />
				<button type="button" className="button-add-website" onClick={this.addWebsiteHandler} disabled={this.state.url.trim() == ""}>ADD WEBSITE</button>
			</div>
			{this.state.urlList.length ?
				this.state.urlList.length === JSON.parse(localStorage.getItem("urlList")).length ?
					<UrlList urlList={this.state.urlList} />
					: <div>Loading...</div>
				: null
			}		</div>
	}
}

export default Dashboard;
