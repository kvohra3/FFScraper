import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import mock_players_data from "../../MOCK_DATA/roster.json";

export default function FullRoster() {
  const [activeRoster, setActiveRoster] = useState({
    players: mock_players_data
  });

  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "Name", field: "name.fullName" },
    { title: "Position", field: "position" },
    { title: "Bye Week", field: "byeWeek", type: "numeric" },
    { title: "Rank", field: "rank", type: "numeric" },
    { title: "ID", field: "id", hidden: true }
  ];

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
          icon: () => <Icon>delete</Icon>,
          tooltip: "Delete User",
          onClick: event => alert("You want to delete a new row")
        }
      ]}
    />
  );
}
