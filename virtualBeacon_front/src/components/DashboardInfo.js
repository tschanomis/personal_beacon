import React from 'react';

import Donut from './Donut';

import './style/DashboardInfo.css';

class DashboardInfo extends React.Component {
  state = {
    filter: '',
  }

  render() {
    this.props.items.filter(item => item.name.toLowerCase().search(this.state.filter.toLowerCase()) !== -1)
    return (
      <div className="DashboardInfo" style={this.props.displayMobileInfo ? { display: 'flex' } : null}>
        <div className="DashboardInfo-exit" onClick={() => this.props.displayReturn()}>X</div>
        <div className="DashboardInfo-header">
          <div className="DashboardInfo-header-logo"></div>
        </div>
        <div className="DashboardInfo-stats">
          <h4>Nombre de balises</h4>
          <hr />
          <div className="DashboardInfo-stats-container">
            <Donut progress={(this.props.items.length / 15) * 100} />
            <div className="DashboardInfo-stats-legend">
              <div className="DashboardInfo-stats-legend-item">
                <p>TOTAL 15</p>
              </div>
              <div className="DashboardInfo-stats-legend-item">
                <span className="DashboardInfo-stats-legend-item-color" style={{ backgroundColor: '#5ab2ac' }}></span>
                <p>actives {this.props.items.length}</p>
              </div>
              <div className="DashboardInfo-stats-legend-item">
                <span className="DashboardInfo-stats-legend-item-color" style={{ backgroundColor: '#233068' }} ></span>
                <p>disponibles {(15 - this.props.items.length)}</p>
              </div>
            </div>
          </div>
          <div className="DashboardInfo-filter">
            <input type="text" placeholder="Recherche nom balise" onChange={(e) => this.setState({ filter: e.target.value })}></input>
          </div>
        </div>
        <hr />
        <div className="DashboardInfo-lists">
          <div className="DashboardInfo-lists-container">
            {this.props.items.filter(item => item.name.toLowerCase().search(this.state.filter.toLowerCase()) !== -1).map((item, i) =>
              <div key={i} className="DashboardInfo-lists-card">
                <span className="DashboardInfo-lists-card-color" style={{
                  backgroundColor: item.id === this.props.giveIndex ? '#233068' : '#5ac2ab',
                }} />
                <div className="DashboardInfo-lists-card-info">
                  <p> balise numéro: {item.id}</p>
                  <p> nom: {item.name}</p>
                  <p> description: {item.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div >
    );
  }
}

export default DashboardInfo;
