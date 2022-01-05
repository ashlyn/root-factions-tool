import React from "react";
import Typography from "@mui/material/Typography";
import { Faction } from "../../utils/factions";
import InlineFaction from "../InlineFaction/InlineFaction";
import styles from "./FactionDisplayList.module.scss";

const separator = "\u00B7";

const FactionDisplayList = ({
  factions,
  showTotalReach,
}: {
  factions: Faction[];
  showTotalReach?: boolean;
}) => {
  return (
    <ul className={styles.FactionsContainer}>
      {factions.map((f, i) => (
        <li className={styles.FactionItem} key={f.name}>
          <InlineFaction faction={f} />
          {i < factions.length - 1 && (
            <Typography className={styles.Separator}>{separator}</Typography>
          )}
        </li>
      ))}
      {showTotalReach && (
        <li key="reach">
          <Typography>
            <b>Total Reach: {factions.reduce((a, b) => a + b.reach, 0)}</b>
          </Typography>
        </li>
      )}
    </ul>
  );
};

export default FactionDisplayList;
