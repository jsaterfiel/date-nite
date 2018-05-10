import React, { Component } from "react";
import { connect } from "react-redux";
import CreateDateHeader from "../components/CreateDateHeader";
import Footer from "../components/Footer";
import YelpInfo from "../components/YelpInfo";
import SearchLocation from "../components/SearchLocation";
import GoogleMapContainer from "../components/GoogleMapsContainer";

class CreateDate extends Component {
  state = {
    showGoogle: false
  };

  componentDidMount() {
    console.log("component mounted");
  }

  componentWillReceiveProps(newProps) {
    console.log("will receive props");
  }

  handleSearch(e) {
    this.setState((prevState, prevProps) => {
      return { showGoogle: !prevState.showGoogle };
    });
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <CreateDateHeader />
          </div>
        </div>
        <SearchLocation handleSearch={this.handleSearch.bind(this)} />

        {
          //    this.state.showGoogle && (
          <div className="row">
            <GoogleMapContainer />
          </div>
          // )
        }
        <div className="row">
          <YelpInfo />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.general;
};
export default connect(mapStateToProps)(CreateDate);
