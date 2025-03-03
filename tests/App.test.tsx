import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "../src/pages/HomePage";
import { TransparentProvider } from "../src/context/TransparentContext";
import { BrowserRouter } from "react-router-dom";

describe("HomePage", () => {
  it("renders search input with focus", () => {
    render(
      <BrowserRouter>
        <TransparentProvider>
          <HomePage />
        </TransparentProvider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search for anime/i);
    expect(input).toHaveFocus();
  });
});
