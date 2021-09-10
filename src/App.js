import Web3 from "web3";
import React from "react";
import { IFrameEthereumProvider } from '@ledgerhq/iframe-provider';

import Header from "./components/header";
import Allowances from "./components/allowances";

const web3 = new Web3(new IFrameEthereumProvider());

function App() {
    return (
        <div>
            <Header />
            <Allowances web3={web3}/>
        </div>
    );
}

export default App;
