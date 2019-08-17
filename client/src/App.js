import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import "./App.css";

import FullRoster from "./components/FullRoster/FullRoster";
import TeamRoster from "./components/TeamRoster/TeamRoster";

// const generateRow = (col = 2, text = ["Test"]) => {
//   const row = [];
//   for (let i = 0; i < col; i++) {
//     row.push(<TableCell>{text[i]}</TableCell>);
//   }
//   return <TableRow>{row}</TableRow>;
// };
const gridStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary
  }
}));
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
      <div className="container-fluid">
        <div className={gridStyles.root}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TeamRoster />
            </Grid>
            <Grid item xs>
              <FullRoster />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
