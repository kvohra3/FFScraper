import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";

export default function FullRoster(props) {
  const { activeRoster, deactivatePlayer } = props;

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
      data={activeRoster}
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
