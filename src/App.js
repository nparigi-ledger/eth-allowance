import Web3 from "web3";
import React, { useState } from "react";
import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";

import Header from "./components/header";
import Allowances from "./components/allowances";

const web3 = new Web3(new IFrameEthereumProvider());

function App() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  return (
    <div>
      <Header loaded={loaded} error={error} />
      <Allowances
        web3={web3}
        loaded={loaded}
        error={error}
        setLoaded={setLoaded}
        setError={setError}
      />
    </div>
  );
}

export default App;
