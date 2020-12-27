import React, { Component } from 'react';
// import { FaPlus } from 'react-icons/fa';
import './Styles.css';

class AddMeetings extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      organization: '',
      date: '',
      aptTime: '',
      topic: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  handleAdd(e) {
    e.preventDefault();
    let tempApt = {
      name: this.state.name,
      organization: this.state.organization,
      date: this.state.date + ' ' + this.state.aptTime,
      topic: this.state.topic
    };

    this.props.addMeeting(tempApt);

    this.setState({
      name: '',
      organization: '',
      date: '',
      aptTime: '',
      topic: ''
    });
    this.props.toggleForm();
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    
    return (
      <div>

        <div className="card-body">
          <h3>New Appointment</h3>
          <form id="meetingForm" noValidate onSubmit={this.handleAdd}>
            <div>
              <label                
                htmlFor="name"
                readOnly
              >
                Contact Name
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Contact's Name"
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="organization"
              >
                Organization
              </label>
              <div className="col-md-10">
                <input
                  type="text"
                  className="form-control"
                  name="organization"
                  placeholder="Organization Name"
                  value={this.state.organization}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="date"
              >
                Date
              </label>
              <div className="col-md-4">
                <input
                  type="date"
                  className="form-control"
                  name="date"
                  id="date"
                  value={this.state.date}
                  onChange={this.handleChange}
                />
              </div>
              <label
                className="col-md-2 col-form-label text-md-right"
                htmlFor="aptTime"
              >
                Time
              </label>
              <div className="col-md-4">
                <input
                  type="time"
                  className="form-control"
                  name="aptTime"
                  id="aptTime"
                  value={this.state.aptTime}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row">
              <label className="col-md-2 text-md-right" htmlFor="topic">
                Appoitnment Notes
              </label>
              <div className="col-md-10">
                <textarea
                  className="form-control"
                  rows="4"
                  cols="50"
                  name="topic"
                  id="topic"
                  placeholder="Add Notes"
                  value={this.state.topic}
                  onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="form-group form-row mb-0">
              <div className="offset-md-2 col-md-10">
                <button
                  type="submit"
                  className="btn d-block ml-auto"
                >
                  Add Appointment
                </button>

                <button
                  type="button"
                  className="btn d-block ml-auto"
                  onClick={this.props.toggleForm}
                >
                  Cancel
                </button>

              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default AddMeetings;
