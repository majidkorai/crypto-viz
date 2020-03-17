import React from "react";
import PropTypes from "prop-types";
import CryptoListing from "./CryptoListing";
import { Box } from "@material-ui/core";

function Home({ store }) {
  return (
    <Box pb={5}>
      <CryptoListing store={store}></CryptoListing>
    </Box>
  );
}

Home.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired
};

export default Home;
