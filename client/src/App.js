import React from "react";
import Paper from "@material-ui/core/Paper";
import "./App.css";

import FullRoster from "./components/FullRoster/FullRoster";

// const generateRow = (col = 2, text = ["Test"]) => {
//   const row = [];
//   for (let i = 0; i < col; i++) {
//     row.push(<TableCell>{text[i]}</TableCell>);
//   }
//   return <TableRow>{row}</TableRow>;
// };

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  // generateTable = (row = 2, col = 2, text = [["Test1"], ["Test2"]]) => {
  //   const table = [];
  //   for (let i = 0; i < row; i++) {
  //     table.push(generateRow(col, text[i]));
  //   }
  //   console.log("table", table);
  //   return table;
  // };

  render() {
    return (
      <div className="container">
        <FullRoster />
      </div>
    );
  }
}
