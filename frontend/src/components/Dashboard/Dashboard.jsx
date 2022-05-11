import React, { useState, useEffect } from "react";
import axios, { Axios } from "axios";
import { toast, ToastContainer } from "react-toastify";
import Forms from "../AuthSystem/Login";
import Account from "../Account/Account";
import CssBaseline from '@material-ui/core/CssBaseline'
import EnhancedTable from './components/EnhancedTable'

import { Navbar, Nav, Button, Offcanvas, Container } from "react-bootstrap";

import "react-toastify/dist/ReactToastify.css";
import images from "../../resources/images";
import "./Dashboard.css";
import emailjs from 'emailjs-com';
import contract from "../../resources/contracts/SlimyGang.json";
import { ethers } from "ethers";



const Dashboard = () => {
  const [show, setShow] = useState(false);
  const [contractMoney, setContractMoney] = useState(0);
  const [users, setUsers] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [skipPageReset, setSkipPageReset] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [account, setAccount] = useState(false);

  const handleCloseAcc = () => setAccount(false);
  const handleShowAcc = () => setAccount(true);

  const APIKEY = "W7EBPQY2YNM4XXSWJGAWEVZ8UJKXHXDCGZ";

  let contractAddress = "0xCe9D5bb1FD234d3BAF0B8C5114be375faF18eeC9";


  const getNftByIdHandler = async () => {
    if(document.getElementById("nftById").value == ""){
      document.getElementById("nftByWalletBTN").disabled = false
      notify("error", "Make sure you have inputed something", "gg")
      return;
    }

    notify("info", "Searching NFT", "ff");
    // //ONLY ALLOW ONE MINT PARA NAO TER DOWNTIME
    // let nft = await nftContract.tokenURI(document.getElementById("nftById").value);
    // nft = nft.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/")
    // console.log(nft)

    await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${document.getElementById("nftById").value}/`).then((res) => {
      // let image = res["data"].image.replace("ipfs://", "https://gateway.pinata.cloud/ipfs/");
      // let name = res["data"].name
      console.log(res)
      let image = res["data"].image_url
      let name = res["data"].name;
      notify("success", `Found "${name}"`, "ee")
      document.getElementById("nftByIdIMG").innerHTML = `<h4>${name}</h4><img src="${image}" class="mb-3" width="300" alt="" />`
    }).catch((error) => {
      if(error.response["data"].success == false){
        notify("error", "No NFT found with that ID", "dd")
      }
      notify("error", error, "dd")
    })
  };


  const getNftByWalletHandler = async () => {
    document.getElementById("nftByWalletBTN").disabled = true
    document.getElementById("nftByWalletIMG").innerHTML = ""
    if(document.getElementById("nftByWallet").value == ""){
      document.getElementById("nftByWalletBTN").disabled = false
      notify("error", "Make sure you have inputed something", "cc")
      return;
    }

    notify("info", "Searching NFTs", "aa");

    setTimeout(async () => {
      await axios.get(`https://testnets-api.opensea.io/api/v1/assets?order_direction=asc&owner=${document.getElementById("nftByWallet").value}&asset_contract_address=${contractAddress}`)
      .then((res) => {
        let { assets } = res["data"]
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

        document.getElementById("nftByWalletBTN").disabled = false
        console.log(res)
        notify("success", `Found ${assets.length} NFTs`, "ll")
      }).catch((error) => {
        console.log(error)
        document.getElementById("nftByWalletBTN").disabled = false
        notify("error", "Please introduce a valid Wallet Address", "bb")
      })
    }, 2000)

  };

  const updateMetadataNFTsHandler = async () => {
    document.getElementById("updatemetadatabtn").disabled = true;
    notify("info", "Updating NFTs Metadata", "aa");
    let assets = {}
    let c = 1
    let q = 3;

    await axios.get(`https://testnets-api.opensea.io/api/v1/assets?asset_contract_address=${contractAddress}`)
    .then((res) => {
      let  assets = res["data"].assets
      c = assets.length
      q = assets.length;


    }).catch((error) => {
      console.log(error)
      document.getElementById("nftByWalletBTN").disabled = false
      notify("error", "Please introduce a valid Wallet Address", "bb")
    })

    let a = 0;
    setInterval(async () => {
      if(c >= 1){
        a++;
        await axios.get(`https://testnets-api.opensea.io/api/v1/asset/${contractAddress}/${c}/?force_update=true`)
        .then((res) => {

    document.getElementById("updatemetadatabtn").disabled = false;
        }).catch((error) => {
          console.log(error)
          notify("error", "Please introduce a valid Wallet Address", "dbgd")
        })

        c--;
      }
    }, 2000)



};

  const getNFTByIdButton = () => {
    return (
      <form action="" onSubmit={(e) => {e.preventDefault()}}>
        <div id="nftByIdIMG">
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-lg"><input type="number" id="nftById" className="form-control text-center" /></div>
          <div className="col-3"></div>
        </div>
        <button
          onClick={getNftByIdHandler}
          type="submit"
          className="btn-minting mt-4 btn btn-sm px-0 pb-2 pt-2"
        >
          Search NFT
        </button>
      </form>
    );
  };

  const getNFTByWalletButton = () => {
    return (
      <form action="" onSubmit={(e) => {e.preventDefault()}}>
        {/* Page Content */}
        <div className="container">
          <div id="nftByWalletIMG" className="row text-center text-lg-start justify-content-center">

          </div>
        </div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-lg"><input type="text" id="nftByWallet" className="form-control text-center" /></div>
          <div className="col-3"></div>
        </div>
        <button
          onClick={getNftByWalletHandler}
          type="submit"
          id="nftByWalletBTN"
          className="btn-minting mt-4 btn btn-sm px-0 pb-2 pt-2"
        >
          Search Wallet NFTs
        </button>
      </form>
    );
  };
  const updateMetadataNFTs = () => {
    return (
        <button
          onClick={updateMetadataNFTsHandler}
          type="button"
          id="updatemetadatabtn"
          className="btn-minting mt-2 btn btn-sm px-0 pb-2 pt-2"
        >
          Update Metadata
        </button>
    );
  };


  let notify = (type, message, toastId) => {
    switch (type) {
      case "success":
        toast.success(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: toastId
        });
        break;
      case "error":
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: toastId
        });
        break;
      case "info":
        toast.info(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: toastId
        });
        break;

      default:
        toast.error(message, {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          pauseOnFocusLoss: false,
          toastId: toastId
        });
        break;
    }
  };


  const verifyContractMoney = (contractAddr) => {
    axios
      .get(
        `https://api-rinkeby.etherscan.io/api?module=account&action=balance&address=${contractAddr}&tag=latest&apikey=${APIKEY}`
      )
      .then((res) => {
        if (res.data["message"] == "NOTOK") {
          notify("error", res.data["result"]);
          return;
        } else {
          setContractMoney((res.data["result"] * 10e-19).toFixed(2));
        }
      })
      .catch((error) => {
        notify("error", error);
      });
  };

  let hideEmail = function (email) {
    return email.replace(/(.{2})(.*)(?=@)/, function (gp1, gp2, gp3) {
      for (let i = 0; i < gp3.length; i++) {
        gp2 += "*";
      }
      return gp2;
    });
  };

  const getUsers = async () => {
    await axios
      .get(`https://andresousa.pt/api/v1/user/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((res) => {
        let users = res.data["users"];
        // for (let i = 0; i < users.length; i++) {
        //    users[i]["email"] = hideEmail(users[i]["email"]);
        // }
        setUsers(res.data["users"]);
        setLoadingData(false);
      })
      .catch((error) => {
        if (!error.response) {
          notify("error", `❌ Couldn't get a connection with the API!`, "cc");
          notify(
            "error",
            "❌ If the error persists contact support@andresousa.pt",
            "ee"
          );
          return;
        }
        if (error.response.status === 400 || error.response.status === 401) {
          if (error.response.data["message"] == "Password doesn't match") {
            notify(
              "error",
              `❌ Current ${error.response.data["message"]}`,
              "dd"
            );
            return;
          } else {
            if(`❌ ${error.response.data["message"]}` == `❌ (ERROR) No Permissions.`){
              document.location.href = "/";
            }
            notify("error", `❌ ${error.response.data["message"]}`, "gg");
            return;
          }
        }
      });
  };


  useEffect(() => {
    verifyContractMoney("0xCe9D5bb1FD234d3BAF0B8C5114be375faF18eeC9");
    setInterval(() => {
      verifyContractMoney("0xCe9D5bb1FD234d3BAF0B8C5114be375faF18eeC9");
    }, 60 * 1000);

    if (loadingData) {
      // if the result is not ready so you make the axios call
      getUsers();
    }
  }, []);

  let isLoggedIn = false;

  if (localStorage.getItem("access_token") != null) {
    isLoggedIn = true;
  }

  const pages = [
    { page: "Homepage", link: "/" },
    { page: "Users", link: "/dashboard#users"},
    { page: "NFTs", link: "/dashboard#searchNFT"},
    // { page: "Posts", link: "/dashboard#posts"}
  ];


  function generatePassword() {
    var length = 11,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}


  const columnsU = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "id",
        Cell: ({ row }) => (
          <p>{row.original["id"]}</p>
        )
      },
      {
        Header: "Name",
        id: "name",
        accessor: "name",
      },
      {
        Header: "Email",
        id: "email",
        accessor: "email",
      },
      {
        Header: "Date of Birth",
        id: "date_of_birth",
        accessor: "date_of_birth",
      },
      {
        Header: "Role ID",
        id: "id_role",
        accessor: "id_role"
      },
      {

        accessor: "password",
        id: "password",
        Header: "Password",
        Cell: ({ row, value }) => (
          <button
            className="btn btn-light"
            onClick={async () => {
              const updatedRow = row.values;
              const id = updatedRow.id;
              let password = generatePassword()
              let data = {
                password: password
              }

              await axios
              .post(`https://andresousa.pt/api/v1/user/${id}`, data, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              })
              .then((res) => {
                notify("success", "New password sent to user", "bb");
              })
              .catch((error) => {
                if (!error.response) {
                  notify("error", `❌ Couldn't get a connection with the API!`, "cc");
                  notify(
                    "error",
                    "❌ If the error persists contact support@andresousa.pt",
                    "ee"
                  );
                  return;
                }
                if (error.response.status === 400 || error.response.status === 401) {
                  if (error.response.data["message"] == "Password doesn't match") {
                    notify(
                      "error",
                      `❌ Current ${error.response.data["message"]}`,
                      "dd"
                    );
                    return;
                  } else {
                    notify("error", `❌ ${error.response.data["message"]}`, "gg");
                    return;
                  }
                }
              });

              await axios
              .get(`https://andresousa.pt/api/v1/user/${id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
              })
              .then((res) => {
                let emailto = res["data"]["user"].email

                emailjs.send('service_klejpvd', 'template_d3xcan2', {"to_name": emailto, "password": password}, 'kiEIwPVtM1xPJSWoG')
                  .then((result) => {
                      console.log(result.text);
                  }, (error) => {
                      console.log(error.text);
                  });
              })
              .catch((error) => {
                if (!error.response) {
                  notify("error", `❌ Couldn't get a connection with the API!`, "cc");
                  notify(
                    "error",
                    "❌ If the error persists contact support@andresousa.pt",
                    "ee"
                  );
                  return;
                }
                if (error.response.status === 400 || error.response.status === 401) {
                  if (error.response.data["message"] == "Password doesn't match") {
                    notify(
                      "error",
                      `❌ Current ${error.response.data["message"]}`,
                      "dd"
                    );
                    return;
                  } else {
                    notify("error", `❌ ${error.response.data["message"]}`, "gg");
                    return;
                  }
                }
              });

            }}
          >
            Send New Password
          </button>
        )
      }
    ],
    []
  );

  const updateMyDataU = (row, id, newData) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    // console.log(row["original"].id_role)
    let idU = row["original"].id
    let email = newData.email ? newData.email : row["original"].email
    let name = newData.name ? newData.name : row["original"].name
    let id_role = newData.id_role ? newData.id_role : row["original"].id_role
    let dateOfBirth = newData.date_of_birth ? newData.date_of_birth : row["original"].date_of_birth
    let data = {
      name: name,
      email: email,
      date_of_birth: dateOfBirth,
      id_role: id_role
    }
    // call your updateRow API
    axios.post(`https://andresousa.pt/api/v1/user/${idU}`, data,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then((res) => {
    })
    .catch((error) => {
      notify("error", error, "bb");
    });

  }

  return (
    <>
    <CssBaseline />
      <Navbar className="mt-4" collapseOnSelect expand="xl">
        <Container fluid="sm">
          <Navbar.Brand className="ps-3 pe-4 float-right" href=".">
            <img src={images.logo_dark} alt="" width={40} height={77} />
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg-light"
            aria-controls="responsive-navbar-nav"
          />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto fw-bold fs-5 ml-auto float-mg-end text-end">
              {pages.map((pages) => (
                <Nav.Link key="" className="text-light pe-4" href={pages.link}>
                  {pages.page}
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="float-end text-end">
              {/* TODO:  Need to make this when the person login */}
              {/* <Nav.Link href="#">Connect Wallet</Nav.Link> */}
              {isLoggedIn ? (
                <>
                  <input
                    type="image"
                    src={
                      localStorage.getItem("profile_pic") === "null"
                        ? images.default_profile
                        : localStorage.getItem("profile_pic")
                    }
                    name="saveForm"
                    width={100}
                    height={100}
                    onClick={handleShowAcc}
                    alt=""
                  />
                </>
              ) : (
                // </div>
                <Button variant="light" onClick={handleShow}>
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        className="text-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <img
            src={images.slime100x100}
            className="rounded"
            alt=""
            width={100}
            height={100}
          />
          <Forms></Forms>
        </Offcanvas.Body>
      </Offcanvas>

      <Offcanvas
        show={account}
        onHide={handleCloseAcc}
        placement="end"
        className="text-center"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={{ color: "black" }}>
          <Account />
        </Offcanvas.Body>
      </Offcanvas>
      <hr className="h-divider mb-3" size="4" />
      <div className="container-xxl text-center">
        <h2>How much we did so far?</h2>
        <p style={{fontSize: "1.20rem"}}>
          {contractMoney} Ethereum <img src={images.eth} alt="" width={50} />
        </p>
        {/* <h2>Users</h2> */}
        {/* <BasicTable columns={columns} data={users} /> */}
        <EnhancedTable
        columns={columnsU}
        data={users}
        updateMyData={updateMyDataU}
        skipPageReset={skipPageReset}
      />
      <br />
      <h2 id="searchNFT">Search NFTs</h2>
        <div>
          {getNFTByIdButton()}
        </div>
      <br />
      <br />
      <h2>Get NFTs By Wallet</h2>
        <div>
          {getNFTByWalletButton()}
        </div>
      <br />
      <br />
      <h2>Update NFTs Metadata</h2>
        <div>
          {updateMetadataNFTs()}
        </div>

      {/* <h2 id="posts">Posts</h2> */}
      {/* GET TRANSACTIONS ON ETHERSCAN */}
      <br />
      </div>

      <hr className="h-divider mt-3" size="4" />
      <footer className="footer page-footer font-small blue pt-4 text-light">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-1"></div>
            <div className="col-md-7 mt-md-0 mt-3">
              <h5 className="text-uppercase">Slimy NFT Art</h5>
              <p>
                The best collection nowadays! We have a collection of 10k
                Generative Art.
              </p>
            </div>

            <div className="footer-copyright col-md-1 mb-md-0">
              <h5 className="text-uppercase">Links</h5>
              <ul className="list-unstyled">
                {pages.map((pages) => (
                  <li key="">
                    <a href={pages.link}>{pages.page}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-copyright text-center py-3">
          &copy; {new Date().getFullYear()} All rights reserved to{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://pap.andresousa.pt"
          >
            pap.andresousa.pt
          </a>
        </div>
      </footer>

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

export default Dashboard;
