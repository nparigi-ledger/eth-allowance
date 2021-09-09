import React, { Component } from 'react';
import '../App.css';

class header extends Component {

    revokeAll = () => {
        let buttons = document.getElementsByName('revoke');
        for(let button of buttons) {
            button.click();
        }
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <div id="titles">
                        <h1>CYAssets</h1>
                        <h2>Find & revoke all the addresses that can spend your tokens</h2>
                    </div>
                </div>
                <h3 id="loading" hidden>Loading, please wait...</h3>
                <div id="results">
                    <div className="grid-container">
                        <div className="grid-item">Contract</div>
                        <div className="grid-item">Approved Address</div>
                        <div className="grid-item">Allowance</div>
                        <div className="grid-item">Action</div>
                    </div>
                    <div id="revokeAll" hidden>
                        <div className="grid-container">
                            <div className="grid-items">ALL</div>
                            <div className="grid-items">ALL</div>
                            <div className="grid-items">ALL</div>
                            <div className="grid-items">
                                <button className="btn btn-danger" onClick={ this.revokeAll }> Revoke All Allowances</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default header;
