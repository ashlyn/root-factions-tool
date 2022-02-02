import { SyntheticEvent } from "react";

import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import {
  BaseGame,
  Faction,
  SortFactionsByExpansion,
} from "../../utils/factions";
import InlineFaction from "../InlineFaction/InlineFaction";

const GroupedFactionsSelect = ({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: Faction[];
  selected: Faction[];
  onChange: (newSelected: Faction[]) => any;
}) => {
  const id = title.replace(" ", "-");

  const handleChange = (
    _event: SyntheticEvent,
    value: (string | Faction)[]
  ) => {
    let newSelected: Faction[];
    if (!value || !value.length) {
      newSelected = [];
    } else if (typeof value[0] == "string") {
      newSelected = value.map((v) => JSON.parse(v as string) as Faction);
    } else {
      newSelected = value as Faction[];
    }

    onChange(newSelected);
  };

  return (
    <Box>
      <Typography id={`${id}-label`} variant="subtitle1" my={2}>
        {title}
      </Typography>
      <Autocomplete
        multiple
        disableCloseOnSelect
        id={`${id}-select`}
        limitTags={2}
        groupBy={(option) => option.expansion || BaseGame}
        value={selected.filter((f) => options.includes(f))}
        onChange={handleChange}
        options={options.sort(SortFactionsByExpansion)}
        getOptionLabel={(f) => f.name}
        renderOption={(props, option) => (
          <Box component="li" {...props}>
            <InlineFaction faction={option} />
          </Box>
        )}
        renderTags={(tagValue, getTagProps) =>
          tagValue.map((option, index) => (
            <Chip
              label={option.name}
              avatar={<Avatar src={option.icon} alt={option.name} />}
              {...getTagProps({ index })}
              color="warning"
              variant="outlined"
            />
          ))
        }
        renderInput={(params) => <TextField {...params} label={title} />}
      />
    </Box>
  );
};

export default GroupedFactionsSelect;
