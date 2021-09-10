import React, { Component } from "react";
import "../App.css";

class header extends Component {
  revokeAll = () => {
    let buttons = document.getElementsByName("revoke");
    for (let button of buttons) {
      button.click();
    }
  };

  render() {
    return (
      <>
        <div className="header" style={{ marginBottom: "2em" }}>
          <p className="title">CYAssets</p>
          <p className="subtitle">
            Find and revoke all the addresses that can spend your tokens.
          </p>
        </div>
        <div
          className="subtitle"
          id="loading"
          hidden
          style={{ margin: "2em 0" }}
        >
          Loading, please wait...
        </div>
      </>
    );
  }
}

export default header;
