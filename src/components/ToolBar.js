import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';
//FaSortAlphaDown, FaSortAlphaUp

class ToolBar extends Component {
  render() {
    return (
      <>
        <div className="search-panel">
            <span>Search: </span>
            <input
              id="SearchApts"
              type="text"
              className="form-control"
              aria-label="Search Appointments"
              onChange={e => this.props.searchMeetings(e.target.value)}
            />
        </div>
        
        <div className="sort-panel">
          <span>Sort By: </span>
          <select value={this.props.orderBy } onChange={e => this.props.changeOrder(e.target.value, this.props.orderDir) }>
            <option value="name">Name</option>
            <option value="organization">Organization</option>
            <option value="date">Date</option>
          </select>

          <select value={this.props.orderDir } onChange={e => this.props.changeOrder(this.props.orderBy, e.target.value) }>
            <option value="asc">ASC</option>
            <option value="desc">DESC</option>            
          </select>
        </div>

        <div className="add-button-panel">
          <div
             className="meeting-addheading card-header bg-primary text-white"
            onClick={this.props.toggleForm}
          >
            <FaPlus /> Add Appointment
          </div>      
        </div>
      </>

      

    );
  }
}

export default ToolBar;
