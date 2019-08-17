import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import mock_players_data from "../../MOCK_DATA/roster.json";

export default function FullRoster() {
  const [activeRoster, setActiveRoster] = useState({
    players: mock_players_data
  });

  const columns = [
    { title: "Name", field: "name.fullName" },
    { title: "Position", field: "position" },
    { title: "Bye Week", field: "byeWeek", type: "numeric" },
    { title: "Rank", field: "rank", type: "numeric" },
    { title: "ID", field: "id", hidden: true }
  ];

  const deactivatePlayer = (event, rowData) => {
    const active = {
      players: activeRoster.players.filter(player => player.id !== rowData.id)
    };
    console.log(`${rowData.name.fullName} is no longer available`);
    setActiveRoster(active);
  };

  return (
    <MaterialTable
      title="Active Roster"
      columns={columns}
      data={activeRoster.players}
      actions={[
        {
          icon: () => <Icon>add</Icon>,
          tooltip: "Add Player to team",
          onClick: event => alert("You want to add a new row")
        },
        {
          icon: () => <Icon>clear</Icon>,
          tooltip: "Player is no longer available",
          onClick: deactivatePlayer
        }
      ]}
      options={{
        grouping: true,
        pageSize: 25,
        pageSizeOptions: [5, 10, 25, 50, 100]
      }}
    />
  );
}
