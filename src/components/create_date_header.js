import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/create_date.css';

const COUNT = [2,3,4,5,6,7,8];

class CreateDateHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentDate: Moment(),
            selectedDate: null
        };
    }

    countOptions = () => {
        return COUNT.map(option => {
            return <span key={option} className="dropdown-item">{ option }</span>;
        });
    };

    onSelectDateChange = (date) => {
        this.setState({
            selectedDate: date
        });
    };

    render () {
        return (
            <div className="create-date-header">
                <nav className="create-date-nav navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="input-group mb-3 count-container">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Count</button>
                            <div className="dropdown-menu">
                                {this.countOptions()}
                            </div>
                        </div>
                        <input type="text" className="form-control count-text" aria-label="Text input with dropdown button" />
                    </div>
                    <DatePicker className="custom-datepicker" 
                    minDate={this.state.currentDate} selected={this.state.selectedDate} 
                    onChange={this.onSelectDateChange} placeholderText="When's your date?" />
                </nav>
            </div>
        );
    }
};

export default CreateDateHeader;