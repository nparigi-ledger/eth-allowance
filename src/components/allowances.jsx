import React, { Component } from "react";
import {
  getQuery,
  getApproveTransactions,
  getName,
  getApprovedName,
  getEtherScanPage,
  getBalance,
} from "../helpers/helpers";
import Allowance from "./allowance";

class allowances extends Component {
  state = {
    txs: undefined,
    account: undefined,
  };

  constructor(props) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    this.init()
      .then((obj) => {
        this.setState(obj);
      })
      .catch((err) => {
        this.props.setError(err);
      })
      .then(() => this.props.setLoaded(true));
  }

  async init() {
    let account = null;
    try {
      try {
        const accounts = await this.props.web3.eth.requestAccounts();
        account = accounts[0];
      } catch (e) {
        const accounts = await window.ethereum.enable();
        account = accounts[0];
      }
      const chainId = await this.props.web3.eth.getChainId();
      this.setState({ chainId: chainId });
      const query = getQuery(chainId, account);
      const txs = await getApproveTransactions(query);
      for (const index in txs) {
        txs[index].contractName = await getName(txs[index].contract);
        txs[index].balance = await getBalance(txs[index].contract, account);
        txs[index].approvedName = await getApprovedName(chainId, txs[index].approved);
      }
      return {
        txs: txs,
        account: account,
      };
    } catch (e) {
      this.props.setError(e);
    }
  }

  render() {
    let elements = "";
    if (this.state.txs !== undefined && this.state.chainId !== undefined) {
      const etherscanUrl = getEtherScanPage(this.state.chainId);
      elements = this.state.txs.map((tx) => {
        return (
          <Allowance
            etherscanURL={etherscanUrl}
            tx={tx}
            web3={this.props.web3}
            id={tx.contract}
            account={this.state.account}
          />
        );
      });
    }
    return this.props.loaded && !this.props.error ? (
      <div>
        <div style={{ marginBottom: "4em", textAlign: "center" }}>
          <button className="button button--red" onClick={this.revokeAll}>
            {" "}
            Revoke All Allowances
          </button>
        </div>

        <table className="allowance-table">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Balance</th>
              <th>Approved Address</th>
              <th>Allowance</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{elements}</tbody>
        </table>
      </div>
    ) : null;
  }
}

export default allowances;
