import React, { Component } from "react";
import { is721 } from "../helpers/helpers";
import dapps from "../helpers/dapps";
import { ERC20ABI } from "../helpers/ABI";

class allowance extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.setRevokeClick = this.setRevokeClick.bind(this);
        this.dappURL = this.dappURL.bind(this);
    }

    dappURL() {
        const dappsKeys = Object.keys(dapps);
        let url = "";
        for (let key of dappsKeys) {
            if (this.props.tx.contractName.toLowerCase().includes(key)) {
                url = dapps[key];
            }
        }
        return url;
    }

    setRevokeClick() {
        // set the contract and make an approve transaction with a zero allowance
        const { web3 } = this.props;
        const contract = new web3.eth.Contract(ERC20ABI, this.props.tx.contract);
        is721(contract, this.props.tx.allowanceUnEdited).then((result) => {
            if (result) {
                //revoke erc721 by nulling the address
                contract.methods
                    .approve(0, this.props.tx.allowanceUnEdited)
                    .send({ from: this.props.account })
                    .then((receipt) => {
                        console.log("revoked: " + JSON.stringify(receipt));
                    })
                    .catch((err) => {
                        console.log("failed: " + JSON.stringify(err));
                    });
            } else {
                // revoke erc20 by nulling approval amount
                contract.methods
                    .approve(this.props.tx.approved, 0)
                    .send({ from: this.props.account })
                    .then((receipt) => {
                        console.log("revoked: " + JSON.stringify(receipt));
                    })
                    .catch((err) => {
                        console.log(err);
                        console.log("failed: " + JSON.stringify(err));
                    });
            }
        });
    }

    getDappButton() {
        const dappUrl = this.dappURL();
        if (dappUrl !== "") {
            return (
                <button
                    className="btn btn-primary"
                    onClick={() => {
                        window.open(dappUrl);
                    }}
                    id={this.props.id}
                >
                    {" "}
                    Visit dApp
                </button>
            );
        } else {
            return null;
        }
    }

    render() {
        return (
            <tr>
                <td>
                    <a
                        href={this.props.etherscanURL + this.props.tx.contract}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {this.props.tx.contractName}
                    </a>
                </td>
                <td>
                    {this.props.tx.balance}
                </td>

                <td>
                    <a
                        href={this.props.etherscanURL + this.props.tx.approved}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {this.props.tx.approvedName}
                    </a>
                </td>
                <td>{this.props.tx.allowance}</td>
                <td>
                    <button
                        className="button button--red"
                        name="revoke"
                        onClick={() => {
                            this.setRevokeClick();
                        }}
                    >
                        Revoke
                    </button>
                </td>
            </tr>
        );
    }
}

export default allowance;
