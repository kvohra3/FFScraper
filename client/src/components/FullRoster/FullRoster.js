import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";

export default function FullRoster() {
  const [activeRoster, setActiveRoster] = useState({
    data: [
      { name: "Mehmet", surname: "Baran", birthYear: 1987, birthCity: 63 },
      { name: "Zerya Betül", surname: "Baran", birthYear: 2017, birthCity: 34 }
    ]
  });
  const [selectedRow, setSelectedRow] = useState(null);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Surname", field: "surname" },
    { title: "Birth Year", field: "birthYear", type: "numeric" },
    {
      title: "Birth Place",
      field: "birthCity",
      lookup: { 34: "İstanbul", 63: "Şanlıurfa" }
    }
  ];

  return (
    <MaterialTable
      title="Editable Example"
      columns={columns}
      data={activeRoster.data}
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
