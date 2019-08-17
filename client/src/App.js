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
      activeRoster: [],
      team: [
        { position: "QB", isEmpty: true },

        { position: "RB", isEmpty: true },
        { position: "RB", isEmpty: true },

        { position: "WR", isEmpty: true },
        { position: "WR", isEmpty: true },
        { position: "TE", isEmpty: true },

        { position: "FLEX", isEmpty: true },
        { position: "FLEX", isEmpty: true },

        { position: "K", isEmpty: true },
        { position: "D", isEmpty: true },

        { position: "BENCH", isEmpty: true },
        { position: "BENCH", isEmpty: true },
        { position: "BENCH", isEmpty: true },
        { position: "BENCH", isEmpty: true },
        { position: "BENCH", isEmpty: true },
        { position: "BENCH", isEmpty: true }
      ]
    };
    this.state.isRosterFull =
      this.state.team.filter(({ isEmpty }) => isEmpty).length === 0;
  }

  async componentDidMount() {
    const rosterResponse = await fetch("/get/roster");
    const roster = await rosterResponse.json();
    this.setState({
      activeRoster: roster
    });
  }

  flexEligibile = position =>
    position !== "QB" && position !== "K" && position !== "D";

  deactivatePlayer = (event, rowData) => {
    this.setState({
      activeRoster: this.state.activeRoster.filter(
        player => player.id !== rowData.id
      )
    });
    console.log(`${rowData.name.fullName} is no longer available`);
  };

  reactivatePlayer = (event, rowData) => {
    const playerIndex = this.state.team.findIndex(pos => pos.id === rowData.id);
    const newTeam = this.state.team;
    newTeam[playerIndex] = {
      position: rowData.position,
      isEmpty: true
    };

    this.setState({
      team: newTeam,
      activeRoster: [rowData, ...this.state.activeRoster]
    });
    console.log(`${rowData.name.fullName} is available`);
  };

  addPlayerToTeamHelper = (teamIndex, rowData) => {
    const newTeam = this.state.team;
    newTeam[teamIndex] = {
      ...rowData,
      position: newTeam[teamIndex].position
    };

    const newRoster = this.state.activeRoster.filter(
      player => player.id !== rowData.id
    );
    this.setState({
      team: newTeam,
      activeRoster: newRoster
    });
    console.log(`adding ${rowData.name.fullName} to team`);
  };

  addPlayerToTeam = (event, rowData) => {
    const emptyPrimaryPosition = this.state.team.findIndex(
      ({ position, isEmpty }) => position === rowData.position && isEmpty
    );
    if (emptyPrimaryPosition > -1) {
      this.addPlayerToTeamHelper(emptyPrimaryPosition, rowData);
    } else if (this.flexEligibile(rowData.position)) {
      const flexPosition = this.state.team.findIndex(
        ({ position, isEmpty }) => position === "FLEX" && isEmpty
      );
      if (flexPosition > -1) {
        this.addPlayerToTeamHelper(flexPosition, rowData);
      }
    } else if (!this.state.isRosterFull) {
      const benchPosition = this.state.team.findIndex(
        ({ position, isEmpty }) => position === "BENCH" && isEmpty
      );
      if (benchPosition > -1) {
        this.addPlayerToTeamHelper(benchPosition, rowData);
      }
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <div className={gridStyles.root}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TeamRoster
                team={this.state.team}
                reactivatePlayer={this.reactivatePlayer}
              />
            </Grid>
            <Grid item xs>
              <FullRoster
                activeRoster={this.state.activeRoster}
                deactivatePlayer={this.deactivatePlayer}
                addPlayerToTeam={this.addPlayerToTeam}
              />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
