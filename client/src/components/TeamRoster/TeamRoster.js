import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import PositionModal from "../PositionModal/PositionModal";

const order = ["QB", "RB", "WR", "TE", "FLEX", "K", "D", "BENCH"];

export default function TeamRoster() {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeRoster, setActiveRoster] = useState({
    players: [
      { position: "QB" },

      { position: "RB" },
      { position: "RB" },

      { position: "WR" },
      { position: "WR" },
      { position: "TE" },

      { position: "FLEX" },
      { position: "FLEX" },

      { position: "K" },
      { position: "D" },

      { position: "BENCH" },
      { position: "BENCH" },
      { position: "BENCH" },
      { position: "BENCH" },
      { position: "BENCH" },
      { position: "BENCH" }
    ]
  });

  const columns = [
    { title: "Name", field: "name.fullName" },
    { title: "Position", field: "position" },
    { title: "Bye Week", field: "byeWeek", type: "numeric" },
    { title: "ID", field: "id", hidden: true }
  ];

  const handleClose = () => setModalOpen(false);
  return (
    <div>
      <div>
        <Modal open={modalOpen} onClose={handleClose}>
          <PositionModal />
        </Modal>
      </div>
      <MaterialTable
        title="Team"
        columns={columns}
        data={activeRoster.players}
        actions={[
          {
            icon: () => <Icon>add</Icon>,
            tooltip: "Add Player to team",
            onClick: event => setModalOpen(true),
            isFreeAction: true
          },
          {
            icon: () => <Icon>delete</Icon>,
            tooltip: "Delete User",
            onClick: event => alert("You want to delete a new row")
          }
        ]}
        options={{
          search: false,
          paging: false,
          header: false,
          pageSize: activeRoster.players.length
        }}
      />
    </div>
  );
}
