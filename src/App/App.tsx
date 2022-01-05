import React, { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { Expansion, Faction, Factions } from "../utils/factions";
import FactionDisplayList from "../components/FactionDisplayList/FactionDisplayList";
import PlayerCountSlider, {
  MaxPlayers,
} from "../components/PlayerCountSlider/PlayerCountSlider";
import OwnedFactionList from "../components/OwnedExpansionsSelect/OwnedExpansionsSelect";
import { GenerateFactionOptionsForNPlayers } from "../utils/combinationUtil";
import { IsValidCombination } from "../utils/validCombinations";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import styles from "./App.module.scss";
import { green } from "@mui/material/colors";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import { bird, rabbit, fox, mouse } from "../icons/header";

const baseFactions: Faction[] = Factions.filter((f) => !f.expansion);

const theme = createTheme({
  palette: {
    primary: {
      main: green[600],
    },
    secondary: {
      main: "#D7734B",
    },
    background: {
      default: "#FDFAF3",
    },
  },
  typography: {
    fontFamily: "'Libre Baskerville', serif",
  },
});

const App = () => {
  const [ownedFactions, setOwnedFactions] = useState<Faction[]>(baseFactions);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [validFactionCombinations, setValidFactionCombinations] = useState<
    Faction[][]
  >([]);

  useEffect(() => {
    const allCombinations = GenerateFactionOptionsForNPlayers(
      ownedFactions,
      playerCount
    );
    const validCombinations = allCombinations.filter(IsValidCombination);
    setValidFactionCombinations(validCombinations);
  }, [ownedFactions, playerCount]);

  const onPlayerCountChange = (newPlayerCount: number): void => {
    setPlayerCount(newPlayerCount);
  };

  const onOwnedExpansionsChange = (newOwnedExpansions: Expansion[]): void => {
    const newOwnedFactions = Factions.filter((f) =>
      newOwnedExpansions.find((e) => e === f.expansion)
    );
    const totalFactionCount = baseFactions.length + newOwnedFactions.length;
    if (playerCount > totalFactionCount) {
      setPlayerCount(totalFactionCount);
    }
    setOwnedFactions([...baseFactions, ...newOwnedFactions]);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid>
          <Grid item xs={12}>
            <Box
              className={styles.Header}
              sx={{
                width: "fit-content",
              }}
            >
              <Stack className={styles.HeaderContent} p={3}>
                <Box className={styles.HeaderIcons}>
                  <img src={fox} className={styles.HeaderFox} alt="Fox Icon" />
                  <img
                    src={rabbit}
                    className={styles.HeaderRabbit}
                    alt="Rabbit Icon"
                  />
                  <img
                    src={mouse}
                    className={styles.HeaderMouse}
                    alt="Mouse Icon"
                  />
                  <img
                    src={bird}
                    className={styles.HeaderBird}
                    alt="Bird Icon"
                  />
                </Box>
                <Typography variant="h1" className={styles.Title}>
                  Root
                </Typography>
                <Typography variant="h6">Faction Builder Tool</Typography>
                <Typography variant="subtitle2">
                  Use this tool to help build valid game sets according to the
                  Law of Root.
                </Typography>
              </Stack>
            </Box>
          </Grid>
          <Box sx={{ m: 2, paddingBottom: 24 }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent="center"
            >
              <Grid item className={styles.Options}>
                <PlayerCountSlider
                  onPlayerCountChange={onPlayerCountChange}
                  players={playerCount}
                  maxPlayers={Math.min(MaxPlayers, ownedFactions.length)}
                />
                <OwnedFactionList
                  onOwnedExpansionsChange={onOwnedExpansionsChange}
                />
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h5">Valid Faction Setups</Typography>
                <Stack
                  sx={{
                    maxHeight: 600,
                    overflow: "auto",
                  }}
                  spacing={2}
                >
                  {validFactionCombinations.length ? (
                    validFactionCombinations.map((combo) => (
                      <FactionDisplayList
                        factions={combo}
                        showTotalReach
                        key={combo.map((f: Faction) => f.name).join(",")}
                      />
                    ))
                  ) : (
                    <Typography>No valid faction combinations</Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>
          </Box>
          <Box
            sx={{
              textAlign: "center",
              alignSelf: "flex-end",
            }}
          >
            <Typography variant="caption">
              This website is not affiliated, associated, authorized, endorsed
              by, or in any way officially connected with Root or Leder Games.
            </Typography>
          </Box>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
