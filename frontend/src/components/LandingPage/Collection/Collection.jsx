import React, { Component } from "react";
import images from "../../../resources/images";
import ImageGallery from "react-image-gallery";

import "./Collection.css";

const slimes = [
  {
    original: images.coll_1,
    thumbnail: images.coll_1,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_2,
    thumbnail: images.coll_2,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_3,
    thumbnail: images.coll_3,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_4,
    thumbnail: images.coll_4,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_5,
    thumbnail: images.coll_5,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_6,
    thumbnail: images.coll_6,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_7,
    thumbnail: images.coll_7,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_8,
    thumbnail: images.coll_8,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_9,
    thumbnail: images.coll_9,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
  {
    original: images.coll_10,
    thumbnail: images.coll_10,
    originalWidth: 300,
    originalHeight: 300,
    thumbnailHeight: 70,
    thumbnailWidth: 70,
  },
];

class Collection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  render() {
    const { width } = this.state;
    const isMobile = width <= 1000;

    if (isMobile) {
      return (
        <>
          <div className="container text-center" id="collection">
            <h1 className="fw-light text-center mt-4 mb-0">Slimy Examples</h1>
            <hr className="mt-2 mb-5" size="4" />
            <ImageGallery
              items={slimes}
              infinite={true}
              showNav={true}
              showFullscreenButton={false}
              showPlayButton={false}
            />
          </div>
        </>
      );
    }

    return (
      <>
        <div className="container text-center mb-4" id="collection">
          <h1 className="fw-light text-center mt-4 mb0">Slimy Examples</h1>
          <hr className="mt-2 mb-5" size="4" />
          <ImageGallery
            items={slimes}
            infinite={true}
            showNav={true}
            showFullscreenButton={false}
            showPlayButton={false}
          />
        </div>
      </>
    );
  }
}

export default Collection;
