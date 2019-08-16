import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import logo from "./logo.svg";
import "./App.css";
import { TableHead } from "@material-ui/core";

const generateRow = (col = 2, text = ["Test"]) => {
  const row = [];
  for (let i = 0; i < col; i++) {
    row.push(<TableCell>{text[i]}</TableCell>);
  }
  return <TableRow>{row}</TableRow>;
};

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  generateTable = (row = 2, col = 2, text = [["Test1"], ["Test2"]]) => {
    const table = [];
    for (let i = 0; i < row; i++) {
      table.push(generateRow(col, text[i]));
    }
    console.log("table", table);
    return table;
  };

  render() {
    return (
      <div className="App">
        <h1 className="title">Roster</h1>
        <Paper className="container">
          <Table>
            <TableBody>
              <TableRow>
                <TableCell rowSpan={3} />
                <TableCell colSpan={2}>Subtotal</TableCell>
                <TableCell align="right">Test</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax</TableCell>
                <TableCell align="right">Test1</TableCell>
                <TableCell align="right">Test2</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell align="right">Teest3</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}
