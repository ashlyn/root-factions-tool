import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import { bird, fox, mouse, rabbit } from "../../icons/header";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <Box
      className={styles.Header}
      sx={{
        width: "fit-content",
        my: 2,
        ml: 0,
        mr: 2,
      }}
    >
      <Stack className={styles.HeaderContent} p={3}>
        <Box className={styles.HeaderIcons}>
          <img src={fox} className={styles.HeaderFox} alt="Fox Icon" />
          <img src={rabbit} className={styles.HeaderRabbit} alt="Rabbit Icon" />
          <img src={mouse} className={styles.HeaderMouse} alt="Mouse Icon" />
          <img src={bird} className={styles.HeaderBird} alt="Bird Icon" />
        </Box>
        <Typography variant="h1" className={styles.Title}>
          Root
        </Typography>
        <Typography variant="h6">Faction Builder Tool</Typography>
        <Typography variant="subtitle2">
          Use this tool to help build valid game sets according to the Law of
          Root.
        </Typography>
      </Stack>
    </Box>
  );
};

export default Header;
