import React, { useState } from "react";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";
import PositionModal from "../PositionModal/PositionModal";

const order = ["QB", "RB", "WR", "TE", "FLEX", "K", "D", "BENCH"];

export default function TeamRoster(props) {
  const { team, reactivatePlayer } = props;
  const [modalOpen, setModalOpen] = React.useState(false);

  const columns = [
    { title: "Name", field: "name.fullName" },
    { title: "Team_Position", field: "team_position" },
    { title: "Bye Week", field: "byeWeek", type: "numeric" },
    { title: "Team", field: "team", hidden: true },
    { title: "Position", field: "position", hidden: true },
    { title: "Rank", field: "rank", type: "numeric", hidden: true },
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
        data={team}
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
            onClick: reactivatePlayer
          }
        ]}
        options={{
          search: false,
          paging: false,
          header: false,
          pageSize: team.length
        }}
      />
    </div>
  );
}
