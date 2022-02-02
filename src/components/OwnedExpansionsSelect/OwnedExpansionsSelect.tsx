import React, { SyntheticEvent, useState } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import { Expansion } from "../../utils/factions";

const expansions = Object.values(Expansion);

const OwnedExpansionsSelect = ({
  onOwnedExpansionsChange,
}: {
  onOwnedExpansionsChange: (ownedExpansions: Expansion[]) => any;
}) => {
  const [selectedExpansions, setSelectedExpansions] = useState<Expansion[]>([]);

  const handleChange = (_event: SyntheticEvent, value: string[]) => {
    const newOwnedExpansions = value as Expansion[];
    setSelectedExpansions(newOwnedExpansions);
    onOwnedExpansionsChange(newOwnedExpansions);
  };

  return (
    <Box>
      <Typography id="players-label" variant="subtitle1" mb={2}>
        Select Expansions
      </Typography>
      <Autocomplete
        multiple
        disableCloseOnSelect
        id="owned-expansions-select"
        limitTags={2}
        value={selectedExpansions}
        onChange={handleChange}
        options={expansions}
        getOptionLabel={(exp) => exp}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((exp, index) => (
            <Chip
              label={exp}
              {...getTagProps({ index })}
              color="warning"
              variant="outlined"
            />
          ))
        }
        sx={{ bgcolor: "background.paper" }}
        renderInput={(params) => (
          <TextField {...params} label="Owned Expansions" />
        )}
      />
    </Box>
  );
};

export default OwnedExpansionsSelect;
