import React from "react";
import PropTypes from "prop-types";
import useCryptoListing from "./hooks/useCryptoListing";
import useCryptoProps from "./hooks/useCryptoProps";
import CurrencyTable from "./CurrencyTable";
import CurrencyCharts from "./CurrencyCharts";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

function CryptoListing({ store }) {
  const { cryptoListing } = useCryptoListing(store);
  const { isFetchingData } = useCryptoProps(store);
  console.log(isFetchingData);
  const classes = useStyles();
  return isFetchingData ? (
    <Backdrop className={classes.backdrop} open={isFetchingData}>
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <div>
      <h1>Crypto Currencies</h1>
      <CurrencyCharts list={cryptoListing}></CurrencyCharts>
      <CurrencyTable list={cryptoListing}></CurrencyTable>
    </div>
  );
}

CryptoListing.propTypes = {
  store: PropTypes.objectOf(PropTypes.object).isRequired
};

export default CryptoListing;
