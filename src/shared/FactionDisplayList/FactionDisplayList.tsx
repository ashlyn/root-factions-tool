import React from "react";
import Typography from "@mui/material/Typography";
import { Faction } from "../Factions";
import InlineFaction from "../InlineFaction/InlineFaction";
import styles from "./FactionDisplayList.module.scss";

const separator = "\u00B71";

const FactionDisplayList = ({ factions }: { factions: Faction[] }) => {
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
    </ul>
  );
};

export default FactionDisplayList;
