import React from "react";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

const PlayerCountSlider = ({
  maxPlayers,
  onPlayerCountChange,
  players,
}: {
  maxPlayers?: number;
  onPlayerCountChange: (players: number) => any;
  players: number;
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    onPlayerCountChange(newValue as number);
  };

  return (
    <div>
      <Typography>
        <h2>Players</h2>
        If playing with bots, include them in the player count.
      </Typography>
      <Slider
        aria-label="Players"
        defaultValue={players}
        valueLabelDisplay="auto"
        step={1}
        min={2}
        max={maxPlayers || 6}
        onChange={handleChange}
        marks
      />
    </div>
  );
};

export default PlayerCountSlider;
