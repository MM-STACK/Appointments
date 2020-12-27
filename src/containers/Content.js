import React, {Component} from 'react';
import './Styles.css';

import ToolBar from '../components/ToolBar';
import AddMeeting from '../components/AddMeeting';
import MeetingsList from '../components/MeetingsList';

import { findIndex, without } from 'lodash';

class Content extends Component {
  constructor() {
    super();
    this.state = {
      myMeetings: [],
      formDisplay: false,
      orderBy: 'name',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0
    };

    this.sayHello = this.sayHello.bind(this);
    this.deleteMeeting = this.deleteMeeting.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.addMeeting = this.addMeeting.bind(this);
    this.changeOrder = this.changeOrder.bind(this);
    this.searchMeetings = this.searchMeetings.bind(this);
    this.updateMeetingInfo = this.updateMeetingInfo.bind(this);
  }

  sayHello() {
    alert('hello');
  }

  toggleForm() {  
    this.setState({
      formDisplay: !this.state.formDisplay
    });
  }

  searchMeetings(query) {
    this.setState({ queryText: query });
  }

  changeOrder(order, dir) {
    this.setState({
      orderBy: order,
      orderDir: dir
    });
  }

  updateMeetingInfo(name, value, id) {
    let tempMeetings = this.state.myMeetings;
    let aptIndex = findIndex(this.state.myMeetings, {
      meetingId: id
    });
    tempMeetings[aptIndex][name] = value;
    this.setState({
      myMeetings: tempMeetings
    });
  }

  addMeeting(apt) {
    let tempMeetings = this.state.myMeetings;
    apt.meetingId = this.state.lastIndex;
    tempMeetings.unshift(apt);
    this.setState({
      myMeetings: tempMeetings,
      lastIndex: this.state.lastIndex + 1      
    });
  }

  deleteMeeting(apt) {
    let tempMeetings = this.state.myMeetings;
    tempMeetings = without(tempMeetings, apt);

    this.setState({
      myMeetings: tempMeetings
    });
  }

  componentDidMount() {
    fetch('./meetings_db.json')
      .then(response => response.json())
      .then(result => {
        const meetings = result.map(item => {
          item.meetingId = this.state.lastIndex;
          this.setState({ lastIndex: this.state.lastIndex + 1 });
          return item;
        });
        this.setState({
          myMeetings: meetings
        });
      });
  }

  render() {    
    let orderSeq;
    let filteredMeetings = this.state.myMeetings;
  
    if (this.state.orderDir === 'asc') {
      orderSeq = 1;
    } else {
      orderSeq = -1;
    }

    filteredMeetings = filteredMeetings
      .sort((a, b) => {          
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return -1 * orderSeq;
        } else {
          return 1 * orderSeq;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['name']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['organization']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase()) ||
          eachItem['topic']
            .toLowerCase()
            .includes(this.state.queryText.toLowerCase())
        );
      });
    
      const toolBarComponent =  <ToolBar
            orderBy={this.state.orderBy}            
            orderDir={this.state.orderDir}
            changeOrder={this.changeOrder}
            toggleForm={this.toggleForm}
            searchMeetings={this.searchMeetings}
          />
        

    return (      
        <div className="content">                    
          
          {(this.state.formDisplay) ? null : <div className="tool-bar"> {toolBarComponent} </div> }        

          <div className={"meeting-form " + (this.state.formDisplay ? 'open' : 'closed') } >     
            <AddMeeting              
              toggleForm={this.toggleForm}
              addMeeting={this.addMeeting}
            /> 
          </div>

          <div className={"list-container " + (this.state.formDisplay ? 'closed' : 'open') } >  
              <MeetingsList
                meetings={filteredMeetings}
                deleteMeeting={this.deleteMeeting}
                updateMeetingInfo={this.updateMeetingInfo}
              />            
          </div>    
        </div>  
    );
  }
}

export default Content;

