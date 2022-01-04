import React, { useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";
import { Factions } from "./shared/Factions";
import FactionDisplayList from "./shared/FactionDisplayList/FactionDisplayList";
import PlayerCountSlider from "./PlayerCountSlider/PlayerCountSlider";
// import OwnedFactionList from "./OwnedFactionList/OwnedFactionList";
import { Button } from "@mui/material";
import { GenerateFactionOptionsForNPlayers } from "./shared/combinations";
import { IsValidCombination } from "./shared/validCombinations";

function App() {
  const [availableFactions] = useState(Factions);
  const [validFactionCombinations, setValidFactionCombinations] = useState([]);
  const [playerCount, setPlayerCount] = useState(2);

  const generateCombinations = () => {
    const allCombinations = GenerateFactionOptionsForNPlayers(
      availableFactions,
      playerCount
    );
    const validCombinations = allCombinations.filter(IsValidCombination);
    setValidFactionCombinations(validCombinations);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="App">
        <header className="App-header">
          {/* <OwnedFactionList availableFactions={Factions} /> */}
          <PlayerCountSlider
            onPlayerCountChange={(newValue) => setPlayerCount(newValue)}
            players={playerCount}
            maxPlayers={Math.min(6, availableFactions.length)}
          />
          <Button variant="outlined" onClick={generateCombinations}>
            Show Faction Options
          </Button>
          {validFactionCombinations.map((combo) => (
            <FactionDisplayList factions={combo} />
          ))}
        </header>
      </div>
    </React.Fragment>
  );
}

export default App;
