import React from "react";

import Box from "@mui/material/Box";

import { Faction } from "../../utils/factions";
import GroupedFactionsSelect from "../GroupedFactionsSelect/GroupedFactionsSelect";

const AdvancedOptionsPanel = ({
  ownedFactions,
  mustIncludeFactions,
  dontIncludeFactions,
  onMustIncludeFactionsChange,
  onDontIncludeFactionsChange,
}: {
  ownedFactions: Faction[];
  mustIncludeFactions: Faction[];
  dontIncludeFactions: Faction[];
  onMustIncludeFactionsChange: (mustIncludeFactions: Faction[]) => any;
  onDontIncludeFactionsChange: (dontIncludeFactions: Faction[]) => any;
}) => {
  return (
    <Box>
      <GroupedFactionsSelect
        title="Include Factions"
        options={ownedFactions.filter((f) => !dontIncludeFactions.includes(f))}
        selected={mustIncludeFactions}
        onChange={onMustIncludeFactionsChange}
      />
      <GroupedFactionsSelect
        title="Include Factions"
        options={ownedFactions.filter((f) => !mustIncludeFactions.includes(f))}
        selected={dontIncludeFactions}
        onChange={onDontIncludeFactionsChange}
      />
    </Box>
  );
};

export default AdvancedOptionsPanel;
