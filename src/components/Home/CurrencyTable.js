import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import NumberFormat from 'react-number-format';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default ({ list }) => {
  const classes = useStyles();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Symbol</TableCell>
            <TableCell align="right">Max Supply</TableCell>
            <TableCell align="right">Circulating Supply</TableCell>
            <TableCell align="right">Total Supply</TableCell>
            <TableCell align="right">Today's Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.symbol}</TableCell>
              <TableCell align="right"><NumberFormat value={row.max_supply} displayType={'text'} decimalScale={2} thousandSeparator={true} /></TableCell>
              <TableCell align="right"><NumberFormat value={row.circulating_supply} displayType={'text'} decimalScale={2} thousandSeparator={true} /></TableCell>
              <TableCell align="right"><NumberFormat value={row.total_supply} displayType={'text'} decimalScale={2} thousandSeparator={true} /></TableCell>
              <TableCell align="right"><NumberFormat value={row.quote.USD.price} displayType={'text'} prefix="$" decimalScale={2} thousandSeparator={true} /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
