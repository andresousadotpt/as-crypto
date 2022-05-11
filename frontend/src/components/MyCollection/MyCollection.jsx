import React, { useEffect, useState } from "react";

import images from "../../resources/images";
import { Navbar, Footer } from "..";
import contract from "../../resources/contracts/SlimyGang.json";
import { ToastContainer, toast } from "react-toastify";
import { ethers } from "ethers";

import "./MyCollection.css";
import axios from "axios";

let contractAddress = "0xCe9D5bb1FD234d3BAF0B8C5114be375faF18eeC9";
let abi = contract.abi;

const MyCollection = () => {
  let toastId = "MyCollectionPage";
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

  const mintNftHandler = async (e) => {
    document.getElementById("nftByWalletIMG").innerHTML = ""
    document.getElementById("btnGetMyColl").disabled = true
    setTimeout(async () => {
      await axios.get(`https://testnets-api.opensea.io/api/v1/assets?order_direction=asc&owner=${currentAccount}&asset_contract_address=${contractAddress}`)
      .then((res) => {
        let { assets } = res["data"]
        console.log(res)
        for (let i = 0; i < assets.length; i++) {
          const image = assets[i].image_url;
          const name = assets[i].name;
          document.getElementById("nftByWalletIMG").innerHTML +=
            `
            <div class="col-lg-3 col-md-4 col-6">
                  <h5>${name}</h5>
                  <img
                    class="img-fluid"
                    src="${image}"
                    alt=""
                  />
              </div>
            `

        }
        document.getElementById("btnGetMyColl").disabled = false

        console.log(res)
        notify("success", `Found ${assets.length} NFTs`)

      }).catch((error) => {
        console.log(error)
        notify("error", "Please contact support@andresousa.pt")
      })
    }, 2000)
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
        id="btnGetMyColl"
        className="btn-minting mt-4 btn btn-sm px-0 pb-2 pt-2"
      >
        Get My NFTs
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
            <h2>Slimy Gang Your Collection</h2>

            <div className="container">
          <div id="nftByWalletIMG" className="row text-center text-lg-start justify-content-center">
          </div>
      </div>
            <div>
              {currentAccount ? mintNftButton() : connectWalletButton()}
              <p style={{fontSize: "1rem"}} className="mb-0 mt-5">If your nfts doesn&apos;t show up <button onClick={() => {location.reload(true);}} className="btn btn-light">Click me <i className="fa-solid fa-arrow-rotate-right"></i></button></p>
              <p style={{fontSize: "1rem"}} className="mt-0">Still doesn&apos;t show up? Contact <a href="mailto:support@andresousa.pt" style={{color: "#519259"}}>support@andresousa.pt</a></p>
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

export default MyCollection;
