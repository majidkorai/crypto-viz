import React from "react";
import { Chart } from "react-google-charts";
import PropTypes from "prop-types";
import { Box, Grid } from "@material-ui/core";

function CurrencyCharts({ list }) {
  const transformed = list.slice(0, 10).map(c => {
    return {
      Currency: c.symbol,
      Price: c.quote.USD.price,
      CirculatingSupply: c.circulating_supply,
      TotalSupply: c.total_supply
    };
  });
  console.log(transformed);
  const totalSupply = transformed.map(c => {
    return [c.Currency, c.TotalSupply];
  });
  const circSupply = transformed.map(c => {
    return [c.Currency, c.CirculatingSupply];
  });
  const priceValues = transformed.map(c => {
    return [c.Currency, c.Price];
  });
  return (
    <Box mb={5}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Chart
            // width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[["Currency", "Total Supply"], ...totalSupply]}
            options={{
              title: "Total Supply"
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            // width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[["Currency", "Circulating Supply"], ...circSupply]}
            options={{
              title: "Circulating Supply"
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <Chart
            // width={"500px"}
            height={"300px"}
            chartType="PieChart"
            loader={<div>Loading Chart</div>}
            data={[["Currency", "Price"], ...priceValues]}
            options={{
              title: "Price"
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

CurrencyCharts.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default CurrencyCharts;
