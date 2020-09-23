import React from 'react';

import './style/List.css';
import axios from 'axios';

class List extends React.Component {
	state = {
		items: []
	}

	componentDidMount() {
		axios.get('http://ec2-18-218-63-27.us-east-2.compute.amazonaws.com/api/places')
			.then(response => this.setState({ items: response.data }))
	}

	render() {
		return (
			<div className="List">
				<div className="List-item-container">
					{this.state.items.map((item, i) =>
						<div key={i} className="item" style={{ backgroundColor: i % 2 === 0 ? 'lightgray' : '' }} >
							<p>Numero : {i + 1}</p>
							<p>Code station : {item.id}</p>
							<p>Nom de la station : {item.Nom_de_la_station}</p>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default List;
