import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const rand = () => Math.round(Math.random() * 20) - 10;

const top = 50 + rand();
const left = 50 + rand();
const useRadioStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

const useModalStyles = makeStyles(theme => ({
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
export default function PositionModal() {
  const radioClasses = useRadioStyles();
  const modalStyles = useModalStyles();
  const [value, setValue] = useState("female");

  function handleChange(event) {
    setValue(event.target.value);
  }
  return (
    <div className={modalStyles.paper}>
      <FormControl component="fieldset" className={radioClasses.formControl}>
        <FormLabel component="legend">Add which position?</FormLabel>
        <RadioGroup
          aria-label="player-position"
          name="position"
          className={radioClasses.group}
          value={value}
          onChange={handleChange}
        >
          <FormControlLabel value="QB" control={<Radio />} label="QB" />
          <FormControlLabel value="RB" control={<Radio />} label="RB" />
          <FormControlLabel value="WR" control={<Radio />} label="WR" />
          <FormControlLabel value="TE" control={<Radio />} label="TE" />
          <FormControlLabel value="K" control={<Radio />} label="K" />
          <FormControlLabel value="D" control={<Radio />} label="D" />
          <FormControlLabel value="FLEX" control={<Radio />} label="FLEX" />
          <FormControlLabel value="BENCH" control={<Radio />} label="BENCH" />
        </RadioGroup>
      </FormControl>
    </div>
  );
}
