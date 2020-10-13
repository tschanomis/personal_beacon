import React, { useState } from 'react';
import Donut from './Donut';

import './style/DashboardInfo.css';

export default function DashboardInfo(props) {

  const [manageDashboardInfo, setManageDashboardInfo] = useState({ filter: '' })

  props.items.filter(item => item.name.toLowerCase().search(manageDashboardInfo.filter.toLowerCase()) !== -1)
  return (
    <div className="DashboardInfo" style={props.displayMobileInfo ? { display: 'flex' } : null}>
      <div className="DashboardInfo-exit" onClick={() => props.displayReturn()}>X</div>
      <div className="DashboardInfo-header">
        <div className="DashboardInfo-header-logo"></div>
      </div>
      <div className="DashboardInfo-stats">
        <h4>Nombre de balises</h4>
        <hr />
        <div className="DashboardInfo-stats-container">
          <Donut progress={(props.items.length / 15) * 100} />
          <div className="DashboardInfo-stats-legend">
            <div className="DashboardInfo-stats-legend-item">
              <p>TOTAL 15</p>
            </div>
            <div className="DashboardInfo-stats-legend-item">
              <span className="DashboardInfo-stats-legend-item-color" style={{ backgroundColor: '#5ab2ac' }}></span>
              <p>actives {props.items.length}</p>
            </div>
            <div className="DashboardInfo-stats-legend-item">
              <span className="DashboardInfo-stats-legend-item-color" style={{ backgroundColor: '#233068' }} ></span>
              <p>disponibles {(15 - props.items.length)}</p>
            </div>
          </div>
        </div>
        <div className="DashboardInfo-filter">
          <input type="text" placeholder="Recherche nom balise" onChange={(e) => setManageDashboardInfo({ filter: e.target.value })}></input>
        </div>
      </div>
      <hr />
      <div className="DashboardInfo-lists">
        <div className="DashboardInfo-lists-container">
          {props.items.filter(item => item.name.toLowerCase().search(manageDashboardInfo.filter.toLowerCase()) !== -1).map((item, i) =>
            <div key={i} className="DashboardInfo-lists-card">
              <span className="DashboardInfo-lists-card-color" style={{
                backgroundColor: item.id === props.giveIndex ? '#233068' : '#5ac2ab',
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
