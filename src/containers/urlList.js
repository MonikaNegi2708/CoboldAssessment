import React from 'react';
import '../App.css';

class UrlList extends React.Component {

	render() {
		return <div>
			<h5>WEBSITES</h5>
			<ul>
				{this.props.urlList.map((el, index) => <li key={index}>
					<div>
						<p>{el.url}</p>
						<div>{el.responseType === 200 ? "LIVE" : "ERROR"}</div>
					</div>
				</li>)}
			</ul>
		</div>
	}
}

export default UrlList;
