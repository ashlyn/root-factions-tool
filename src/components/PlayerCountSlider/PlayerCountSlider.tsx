import React from "react";

import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export const MinPlayers = 2;
export const MaxPlayers = 6;

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

  const marks: { label: string; value: number }[] = [];
  for (let i = MinPlayers; i <= (maxPlayers || MaxPlayers); i++) {
    marks.push({ label: `${i}`, value: i });
  }

  return (
    <Box>
      <Typography id="players-label" variant="subtitle1">
        Players
      </Typography>
      <FormControl sx={{ m: 1, width: 350 }}>
        <Typography variant="caption" color="info">
          Include bots, if applicable, in the player count.
        </Typography>
        <Slider
          aria-label="Players"
          aria-labelledby="players-label"
          value={players}
          valueLabelDisplay="auto"
          step={1}
          min={MinPlayers}
          max={maxPlayers || MaxPlayers}
          onChange={handleChange}
          marks={marks}
        />
      </FormControl>
    </Box>
  );
};

export default PlayerCountSlider;
