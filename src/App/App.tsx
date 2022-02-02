import React, { useEffect, useState } from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { green } from "@mui/material/colors";
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from "@mui/material/styles";

import AdvancedOptionsPanel from "../components/AdvancedOptionsPanel/AdvancedOptionsPanel";
import FactionDisplayList from "../components/FactionDisplayList/FactionDisplayList";
import Header from "../components/Header/Header";
import OwnedFactionList from "../components/OwnedExpansionsSelect/OwnedExpansionsSelect";
import PlayerCountSlider, {
  MaxPlayers,
} from "../components/PlayerCountSlider/PlayerCountSlider";
import { GenerateFactionOptionsForNPlayers } from "../utils/combinationUtil";
import { Expansion, Faction, Factions } from "../utils/factions";
import { IsValidCombination } from "../utils/validCombinations";
import styles from "./App.module.scss";

const baseFactions: Faction[] = Factions.filter((f) => !f.expansion);

const theme = responsiveFontSizes(
  createTheme({
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
  })
);

const App = () => {
  const [ownedFactions, setOwnedFactions] = useState<Faction[]>(baseFactions);
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [validFactionCombinations, setValidFactionCombinations] = useState<
    Faction[][]
  >([]);
  const [mustIncludeFactions, setMustIncludeFactions] = useState<Faction[]>([]);
  const [dontIncludeFactions, setDontIncludeFactions] = useState<Faction[]>([]);

  useEffect(() => {
    const allCombinations = GenerateFactionOptionsForNPlayers(
      ownedFactions.filter((f) => !dontIncludeFactions.includes(f)),
      playerCount
    );
    const validCombinations = allCombinations.filter((c) =>
      IsValidCombination(c, mustIncludeFactions)
    );
    setValidFactionCombinations(validCombinations);
  }, [dontIncludeFactions, mustIncludeFactions, ownedFactions, playerCount]);

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
    const owned = [...baseFactions, ...newOwnedFactions];
    const newMustInclude = mustIncludeFactions.filter((f) => owned.includes(f));
    const newDontInclude = dontIncludeFactions.filter((f) => owned.includes(f));

    setOwnedFactions(owned);
    setMustIncludeFactions(newMustInclude);
    setDontIncludeFactions(newDontInclude);
  };

  const onMustIncludeFactionsChange = (
    newMustIncludeFactions: Faction[]
  ): void => {
    setMustIncludeFactions(newMustIncludeFactions);
  };

  const onDontIncludeFactionsChange = (
    newDontIncludeFactions: Faction[]
  ): void => {
    setDontIncludeFactions(newDontIncludeFactions);
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Grid>
          <Grid item xs={12}>
            <Header />
          </Grid>
          <Box sx={{ m: 2, pb: 24 }}>
            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              justifyContent="center"
            >
              <Grid item className={styles.Options} sm={12} md={4} lg={3}>
                <PlayerCountSlider
                  onPlayerCountChange={onPlayerCountChange}
                  players={playerCount}
                  maxPlayers={Math.min(MaxPlayers, ownedFactions.length)}
                />
                <OwnedFactionList
                  onOwnedExpansionsChange={onOwnedExpansionsChange}
                />

                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="advanced-options-content"
                    id="advanced-options-header"
                  >
                    <Typography>Advanced Options</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <AdvancedOptionsPanel
                      ownedFactions={ownedFactions}
                      mustIncludeFactions={mustIncludeFactions}
                      dontIncludeFactions={dontIncludeFactions}
                      onMustIncludeFactionsChange={onMustIncludeFactionsChange}
                      onDontIncludeFactionsChange={onDontIncludeFactionsChange}
                    />
                  </AccordionDetails>
                </Accordion>
              </Grid>
              <Grid item sm={12} md={8} lg={9}>
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
