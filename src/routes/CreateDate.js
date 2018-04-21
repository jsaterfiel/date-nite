import React, { Component } from 'react';
import '../styles/create_date.css';

class CreateDate extends Component {
  render () {
    return (
        <nav className="create-date-nav navbar navbar-expand-lg navbar-light bg-light">
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Count</button>
                    <div className="dropdown-menu">
                        <a className="dropdown-item" href="#">Action</a>
                        <a className="dropdown-item" href="#">Another action</a>
                        <a className="dropdown-item" href="#">Something else here</a>
                    </div>
                </div>
                <input type="text" className="form-control" aria-label="Text input with dropdown button" />
            </div>
        </nav>
    );
  }
};

export default CreateDate;
