import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import Icon from "@material-ui/core/Icon";
import Modal from "@material-ui/core/Modal";

const order = ["QB", "RB", "WR", "FLEX", "K", "D", "BENCH"];

const rand = () => {
  return Math.round(Math.random() * 20) - 10;
};

const top = 50 + rand();
const left = 50 + rand();
const useStyles = makeStyles(theme => ({
  paper: {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4)
  }
}));

export default function FullRoster() {
  const modalStyles = useStyles();

  const [activeRoster, setActiveRoster] = useState({
    players: [
      { position: "QB" },

      { position: "RB" },
      { position: "RB" },

      { position: "WR" },
      { position: "WR" },

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

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={open}
          onClose={handleClose}
        >
          <div className={modalStyles.paper}>
            <p>testing123</p>
          </div>
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
            onClick: event => handleOpen(),
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
