import { useState, useEffect } from "react";
import { ethers } from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState(undefined);
  const [account, setAccount] = useState(undefined);
  const [atm, setATM] = useState(undefined);
  const [balance, setBalance] = useState(undefined);

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async () => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({ method: "eth_accounts" });
      handleAccount(account);
    }
  };

  const handleAccount = (account) => {
    if (account) {
      console.log("Account connected: ", account);
      setAccount(account);
    } else {
      console.log("No account found");
    }
  };

  const connectAccount = async () => {
    if (!ethWallet) {
      alert("MetaMask wallet is required to connect");
      return;
    }

    const accounts = await ethWallet.request({ method: "eth_requestAccounts" });
    handleAccount(accounts);

    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);

    setATM(atmContract);
  };

  const getBalance = async () => {
    if (atm) {
      setBalance((await atm.getBalance()).toNumber());
    }
  };

  const deposit = async () => {
    if (atm) {
      let tx = await atm.deposit(1);
      await tx.wait();
      getBalance();
    }
  };

  const withdraw = async () => {
    if (atm) {
      let tx = await atm.withdraw(1);
      await tx.wait();
      getBalance();
    }
  };

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>;
    }

    // Check to see if user is connected. If not, connect to their account
    if (!account) {
      return (
        <button className="button" onClick={connectAccount}>
          Please connect your Metamask wallet
        </button>
      );
    }

    if (balance == undefined) {
      getBalance();
    }

    return (
      <div className="info">
        <p>
          Your Account: {account}
          <br />
          Your Balance: {balance}
        </p>
        <button className="button" onClick={deposit}>
          Deposit 1 ETH
        </button>
        <button className="button" onClick={withdraw}>
          Withdraw 1 ETH
        </button>
      </div>
    );
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <main className="wrapper">
      <div className="container">
        <header>
          <h1>
            Welcome to the
            <br />
            Milan's Piggy Bank!
          </h1>
        </header>
        {initUser()}
      </div>
      <style jsx>{`
        .wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #E88D67;
        }
        .container {
          text-align: center;
          background-color: #F3F7EC;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          max-width: 500px;
        }
        .button {
          background-color: #0070f3;
          color: white;
          border: none;
          padding: 10px 20px;
          margin: 10px;
          border-radius: 20px;
          cursor: pointer;
          font-size: 18px;
        }
        .button:hover {
          background-color: #005bb5;
        }
        .info {
          margin-top: 20px;
          font-size: 1.25rem;
        }
        h1 {
          font-size: 2rem;
        }
        p {
          font-size: 1.25rem;
        }
      `}</style>
    </main>
  );
}
