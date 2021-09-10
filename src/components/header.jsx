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
    const { error, loaded } = this.props;
    return (
      <>
        <div className="header" style={{ marginBottom: "2em" }}>
          <p className="title">CYAssets</p>
          <p className="subtitle">
            Find and revoke all the addresses that can spend your tokens.
          </p>
        </div>
        {!loaded && (
          <div className="subtitle" id="loading" style={{ margin: "2em 0" }}>
            Loading, please wait...
          </div>
        )}
        {error && (
          <div
            className="subtitle text--red"
            id="loading"
            style={{ margin: "2em 0" }}
          >
            Error: {error.message}
          </div>
        )}
      </>
    );
  }
}

export default header;
