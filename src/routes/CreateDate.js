import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import Moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import '../styles/create_date.css';

const COUNT = [2,3,4,5,6,7,8];

class CreateDate extends Component {
    constructor(props) {
        super(props);

        const date = new Date().toISOString();

        this.state = {
            currentDate: date
        };
    }

    countOptions = () => {
        return COUNT.map(option => {
            return <span key={option} className="dropdown-item">{ option }</span>;
        });
    };


    render () {
        return (
            <div className="create-date-page">
                <nav className="create-date-nav navbar navbar-expand-lg navbar-dark bg-dark">
                <ul className="nav navbar-nav">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Count</button>
                            <div className="dropdown-menu">
                                {this.countOptions()}
                            </div>
                        </div>
                        <input type="text" className="form-control count-text" aria-label="Text input with dropdown button" />
                    </div>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <DatePicker className="custom-datepicker" minDate={Moment()} selected={this.state.currentDates} placeholderText="When's your date?" />
                    </ul>
                </nav>
                MAP GOES HERE!
            </div>
        );
    }
};

export default CreateDate;
