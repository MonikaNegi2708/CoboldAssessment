import React from 'react';
import UrlList from './urlList';
import axios from 'axios';
import '../App.css';

class Dashboard extends React.Component {
	state = {
		url: "",
		urlList: [],
	}

	componentDidMount() {
		this.getUrlResponse();
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
		return <div>
			<input placeholder="Input with URL validation" onChange={this.onChangeHandler} value={this.state.url} />
			<button type="button" onClick={this.addWebsiteHandler} disabled={this.state.url.trim() == ""}>Add Website</button>
			{this.state.urlList && this.state.urlList.length > 0 ?
				<UrlList urlList={this.state.urlList} />
				: <h1>No results found !</h1>
			}
		</div>
	}
}

export default Dashboard;
