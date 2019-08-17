import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./App.css";

import mock_players_data from "./MOCK_DATA/roster.json";
import FullRoster from "./components/FullRoster/FullRoster";
import TeamRoster from "./components/TeamRoster/TeamRoster";

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
    this.state = {
      activeRoster: mock_players_data,
      team: []
    };
  }

  deactivatePlayer = (event, rowData) => {
    this.setState({
      activeRoster: this.state.activeRoster.filter(
        player => player.id !== rowData.id
      )
    });
    console.log(`${rowData.name.fullName} is no longer available`);
  };

  render() {
    return (
      <div className="container-fluid">
        <div className={gridStyles.root}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TeamRoster />
            </Grid>
            <Grid item xs>
              <FullRoster
                activeRoster={this.state.activeRoster}
                deactivatePlayer={this.deactivatePlayer}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
