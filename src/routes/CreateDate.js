import React, { Component } from 'react';
import CreateDateHeader from '../components/create_date_header';

class CreateDate extends Component {
    render () {
        return (
            <div className="create-date-page">
                <CreateDateHeader />
                <div className="map-container">
                    MAP GOES HERE!
                </div>
            </div>
        );
    }
};

export default CreateDate;
