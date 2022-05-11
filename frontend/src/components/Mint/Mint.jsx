import React, { useEffect, useState } from "react";

import images from "../../resources/images";
import { Navbar, Footer } from "../";
import contract from "../../resources/contracts/SlimyGang.json";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";

import "./Mint.css";

let contractAddress = "0xCe9D5bb1FD234d3BAF0B8C5114be375faF18eeC9";
let abi = contract.abi;

const Mint = () => {
  let toastId = "mintPage";
  let notify = (type, message) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
        });
        break;
      case "info":
        toast.info(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
        });
        break;

      default:
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
        });
        break;
    }
  };
  // https://dev.to/rounakbanik/building-a-web3-frontend-with-react-340c
  // VER ISTO PARA ACABARES ESTA PARTE
  // 0xCe9D5bb1FD234d3BAF0B8C5114be375faF18eeC9 contract address
  // https://app.pinata.cloud/pinmanager pinata tem la 50 nfts
  // ipfs://QmfUcjRiY7cA9hJu4L9F4qRmxu9P2MSFmsLgUdSrNW8M1v/ revlead
  // ipfs://QmXvRffo7PzVFjyrFGa8rRJiRFaNs29fedZTWdQhEaWZhS notrevealed

  //https://rinkeby.etherscan.io/

  //https://testnets.opensea.io/collection/slimygang

  // WE USED THE HARDHAT THING JUST TAKE A LOOK AT SLIMY CONTRACT GITHUB REPO
  // https://etherscan.io/unitconverter GOOD

  const [currentAccount, setCurrentAccount] = useState(null);
  const { ethereum } = window;

  const checkWalletIsConnected = async () => {
    if (!ethereum) {
      notify("error", "Please install Metamask!");
      return;
    }

    // Mainnet: 1
    // Kovan: 42
    // Ropsten: 3
    // Rinkeby: 4
    // Goerli: 5
    if (ethereum.networkVersion != 4) {
      notify(
        "error",
        "Please make sure you are connected to rinkeby testnet network!"
      );
      return;
    }

    const accounts = await ethereum.request({
      method: "eth_accounts",
    });

    if (accounts.length !== 0) {
      const account = accounts[0];
      setCurrentAccount(account);
    } else {
      console.error("No authorized account found!");
    }
  };

  const connectWalletHandler = async () => {
    if (!ethereum) {
      notify("error", "Please install Metamask!");
      return;
    }

    if (ethereum.networkVersion != 4) {
      notify(
        "error",
        "Please make sure you are connected to rinkeby testnet network!"
      );
      return;
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      notify("success", "Connected Successfully!");
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const mintNftHandler = async () => {
    try {
      if (ethereum) {
        if (ethereum.networkVersion != 4) {
          notify(
            "error",
            "Please make sure you are connected to ropsten testnet network!"
          );
          return;
        }
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(contractAddress, abi, signer);

        notify("info", "Initialize payment");
        //ONLY ALLOW ONE MINT PARA NAO TER DOWNTIME
        let nftTxn = await nftContract.mint(1, {
          value: ethers.utils.parseEther("0.06"),
        });

        notify("info", "Minting... please wait");

        await nftTxn.wait();

        alert(
          `Minted, see transaction at: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
        );
        document.location.href = "/mycollection";

      }
    } catch (error) {
      notify("error", error.message);
    }
  };

  const connectWalletButton = () => {
    return (
      <button
        onClick={connectWalletHandler}
        type="button"
        className="btn-minting mt-4 btn btn-sm px-0 pb-2 pt-2"
      >
        Connect Wallet
      </button>
    );
  };

  const mintNftButton = () => {
    return (
      <button
        onClick={mintNftHandler}
        type="button"
        className="btn-minting mt-4 btn btn-sm px-0 pb-2 pt-2"
      >
        Mint NFT
      </button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  return (
    <>
      <Navbar />
      <hr className="h-divider mt-3" size="4" />
      <div className="container mt-3 mintPage">
        <div className="row text-center">
          <div className="col"></div>
          <div className="col-mg-3">
            <h2>Slimy Gang Mint</h2>
            <img
              src={images.coll_1}
              className="img-fluid mt-1 me-0"
              alt=""
              width={300}
              height={300}
            />
            <div>
              {currentAccount ? mintNftButton() : connectWalletButton()}
            </div>
          </div>
          <div className="col mb-3"></div>
        </div>
      </div>
      <hr className="h-divider mt-3" size="4" />
      <Footer />
      <ToastContainer
        position="top-center"
        theme="dark"
        className="text-start"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Mint;
