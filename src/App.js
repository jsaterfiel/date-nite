import React, { Component } from 'react'
import './App.css'

class App extends Component {
  render () {
    return (
      <div className='App'>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div className='card bg-dark text-white'>
                <img className='card-img' src='http://via.placeholder.com/932x270' alt='Date Nite App Banner Image' />
                <div className='card-img-overlay banner'>
                  <button type='button' className='btn btn-primary'>Primary</button>
                </div>
              </div>
            </div>
          </div>
          <div className='row'>
            <div className='col pt-5'>
              <h2>Upcoming Date Nites <span className='badge badge-secondary'>4</span></h2>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>Date</th>
                    <th scope='col'>Place</th>
                    <th scope='col'>Location</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      5/8/2017 7:00 pm
                    </td>
                    <td>
                    La Lucca
                    </td>
                    <td>
                      New York, NY
                    </td>
                    <td scope='row'>
                      <a href='#'>View</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='row'>
            <div className='col'>
              <nav className='nav mt-5 justify-content-end'>
                <a className='nav-link active' href='#'>About</a>
                <a className='nav-link active' href='#'>Contact Us</a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
