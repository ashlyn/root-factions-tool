import React from "react";
import Typography from "@mui/material/Typography";
import { Faction } from "../../utils/factions";
import styles from "./InlineFaction.module.scss";

const InlineFaction = ({
  faction,
  className,
}: {
  faction: Faction;
  className?: string;
}) => {
  return (
    <Typography className={`${className} ${styles.InlineFaction}`}>
      <span className={styles.FactionName}>{faction.name}</span>
      <img
        className={styles.FactionIcon}
        src={faction.icon}
        alt={faction.name}
      />
    </Typography>
  );
};

export default InlineFaction;
