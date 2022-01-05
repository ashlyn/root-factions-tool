import * as React from "react";

import CancelIcon from "@mui/icons-material/Cancel";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import { Theme, useTheme } from "@mui/material/styles";

import { Expansion } from "../../utils/factions";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = Object.values(Expansion);

function getStyles(
  name: string,
  expansionName: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      expansionName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const OwnedExpansionsSelect = ({
  onOwnedExpansionsChange,
}: {
  onOwnedExpansionsChange: (ownedExpansions: Expansion[]) => any;
}) => {
  const theme = useTheme();
  const [selectedExpansions, setSelectedExpansions] = React.useState<string[]>(
    []
  );

  const handleChange = (
    event: SelectChangeEvent<typeof selectedExpansions>
  ) => {
    const {
      target: { value },
    } = event;
    // On autofill we get a stringified value.
    const newOwnedExpansions =
      typeof value === "string" ? value.split(",") : value;
    setSelectedExpansions(newOwnedExpansions);
    onOwnedExpansionsChange(newOwnedExpansions as Expansion[]);
  };

  const handleDelete = (event: Event, value: any) => {
    const newOwnedExpansions = selectedExpansions.filter((e) => e !== value);
    setSelectedExpansions(newOwnedExpansions);
    onOwnedExpansionsChange(newOwnedExpansions as Expansion[]);
  };

  return (
    <Box>
      <Typography id="players-label" variant="subtitle1">
        Select Expansions
      </Typography>
      <FormControl sx={{ m: 1, width: 350 }}>
        <InputLabel id="owned-expansions-label">Owned Expansions</InputLabel>
        <Select
          labelId="owned-expansions-label"
          id="owned-expansions-select"
          multiple
          value={selectedExpansions}
          onChange={handleChange}
          input={
            <OutlinedInput
              id="owned-expansions-select-input"
              label="Owned Expansions"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  color="secondary"
                  key={value}
                  label={value}
                  variant="outlined"
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  }
                  onDelete={(e) => handleDelete(e, value)}
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, selectedExpansions, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default OwnedExpansionsSelect;
