import React, { Component } from "react";

import Main from "./Main/Main";
import Roadmap from "./Roadmap/Roadmap";
import FAQ from "./FAQ/FAQ";
import Staff from "./Staff/Staff";
import Collection from "./Collection/Collection";

class LandingPage extends Component {
  render() {
    return (
      <>
        <Main />
        {/* MAKE THE MINT */}
        <Collection />
        <Roadmap />
        <br />
        <Staff />
        <br />
        <FAQ />
      </>
    );
  }
}

export default LandingPage;
