import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TransparentProvider } from "../src/context/TransparentContext";
import HomePage from "../src/pages/HomePage";

// Mock useSearch hook
jest.mock("../src/hooks/useSearch", () => ({
  useSearch: jest.fn(() => ({
    results: [
      { id: 1, title: { romaji: "Anime 1" }, coverImage: { medium: "url1" } },
      { id: 2, title: { romaji: "Anime 2" }, coverImage: { medium: "url2" } },
    ],
    loading: false,
    error: null,
  })),
}));

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

  it("starts searching as you type", () => {
    render(
      <BrowserRouter>
        <TransparentProvider>
          <HomePage />
        </TransparentProvider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search for anime/i);
    fireEvent.change(input, { target: { value: "Anime" } });
    const results = screen.getAllByRole("img");
    expect(results.length).toBe(2);
  });

  it("resets the app to initial state without full reload", () => {
    render(
      <BrowserRouter>
        <TransparentProvider>
          <HomePage />
        </TransparentProvider>
      </BrowserRouter>
    );

    const input = screen.getByPlaceholderText(/search for anime/i);
    fireEvent.change(input, { target: { value: "Anime" } });
    const resetButton = screen.getByText(/reset/i);
    fireEvent.click(resetButton);
    expect(input).toHaveValue("");
  });
});

describe("HomePage Unique Persistent URLs", () => {
  it("ensures each search result has a unique URL", async () => {
    render(
      <BrowserRouter>
        <TransparentProvider>
          <HomePage />
        </TransparentProvider>
      </BrowserRouter>
    );

    // Optionally, waitFor to ensure the search results have rendered
    await waitFor(() => {
      const links = screen.getAllByTestId("result-link");
      expect(links.length).toBe(2);
    });

    const links = screen.getAllByTestId("result-link");
    expect(links[0]).toHaveAttribute("href", "/anime/1");
    expect(links[1]).toHaveAttribute("href", "/anime/2");
  });
});
