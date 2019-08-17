import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "./App.css";

import FullRoster from "./components/FullRoster/FullRoster";
import TeamRoster from "./components/TeamRoster/TeamRoster";

const order = ["QB", "RB", "WR", "TE", "FLEX", "K", "D", "BENCH"];

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
        { team_position: "QB", isEmpty: true },

        { team_position: "RB", isEmpty: true },
        { team_position: "RB", isEmpty: true },

        { team_position: "WR", isEmpty: true },
        { team_position: "WR", isEmpty: true },
        { team_position: "TE", isEmpty: true },

        { team_position: "FLEX", isEmpty: true },
        { team_position: "FLEX", isEmpty: true },

        { team_position: "K", isEmpty: true },
        { team_position: "D", isEmpty: true },

        { team_position: "BENCH", isEmpty: true },
        { team_position: "BENCH", isEmpty: true },
        { team_position: "BENCH", isEmpty: true },
        { team_position: "BENCH", isEmpty: true },
        { team_position: "BENCH", isEmpty: true },
        { team_position: "BENCH", isEmpty: true }
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
      team_position: rowData.team_position,
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
      team_position: newTeam[teamIndex].team_position
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
      ({ team_position, isEmpty }) =>
        team_position === rowData.position && isEmpty
    );
    const flexPosition = this.state.team.findIndex(
      ({ team_position, isEmpty }) => team_position === "FLEX" && isEmpty
    );
    const benchPosition = this.state.team.findIndex(
      ({ team_position, isEmpty }) => team_position === "BENCH" && isEmpty
    );

    if (emptyPrimaryPosition > -1) {
      this.addPlayerToTeamHelper(emptyPrimaryPosition, rowData);
    }
    if (
      emptyPrimaryPosition < 0 &&
      this.flexEligibile(rowData.position) &&
      flexPosition > -1
    ) {
      this.addPlayerToTeamHelper(flexPosition, rowData);
    }
    if (
      emptyPrimaryPosition < 0 &&
      (flexPosition < 0 || !this.flexEligibile(rowData.position)) &&
      !this.state.isRosterFull &&
      benchPosition > -1
    ) {
      this.addPlayerToTeamHelper(benchPosition, rowData);
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
