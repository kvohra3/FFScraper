import React from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";

export default function FullRoster(props) {
  const { activeRoster, deactivatePlayer, addPlayerToTeam } = props;

  const columns = [
    { title: "Name", field: "name.fullName" },
    { title: "Position", field: "position" },
    { title: "Team", field: "team" },
    { title: "Bye Week", field: "byeWeek", type: "numeric" },
    { title: "Rank", field: "rank", type: "numeric" },
    { title: "ID", field: "id", hidden: true }
  ];

  return (
    <MaterialTable
      isLoading={activeRoster.length > 0 ? false : true}
      title="Active Roster"
      columns={columns}
      data={activeRoster}
      actions={[
        {
          icon: () => <Icon>add</Icon>,
          tooltip: "Add Player to team",
          onClick: addPlayerToTeam
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
