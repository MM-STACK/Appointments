import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import Moment from 'react-moment';
import './Styles.css';

class MeetingsList extends Component {
  render() {
    return (
      <div className="meeting-list">
        {this.props.meetings.map(item => (
          <div className="meeting-item" key={item.meetingId}>

            <div className="meeting-delete">
              <button
                title="Delete Appointment"
                onClick={() => this.props.deleteMeeting(item)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="meeting-body">
              <div>
                <span className="label-item">Name: </span>
                <span
                  className="contact-name"
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => this.props.updateMeetingInfo('name', e.target.innerText, item.meetingId)}
                >
                  {item.name}
                </span>
              </div>

              <div>
                <span className="label-item">Date: </span>
                <span className="meeting-date">
                  <Moment
                    date={item.date}
                    parse="YYYY-MM-DD HH:mm A"
                    format="YYYY/MMM/DD hh:mm A"
                  />
                </span>
              </div>

              <div>
                <span className="label-item">Organization: </span>
                <span
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={e => this.props.updateMeetingInfo('organization', e.target.innerText, item.meetingId)}
                >
                  {item.organization}
                </span>
              </div>
            </div>

            <div className="meeting-details">
              <div
                className="meeting-notes"
                contentEditable
                suppressContentEditableWarning
                onBlur={e => this.props.updateMeetingInfo('topic', e.target.innerText, item.meetingId)}
                dangerouslySetInnerHTML={{__html:item.topic}}
              >
                {/* {item.topic}  */}
              </div>

            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default MeetingsList;
