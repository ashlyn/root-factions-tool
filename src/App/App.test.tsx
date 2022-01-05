import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders subtitle", () => {
  render(<App />);
  const linkElement = screen.getByText(/Faction Builder Tool/i);
  expect(linkElement).toBeInTheDocument();
});
