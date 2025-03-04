import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchResultItem from "../src/components/SearchResultItem";
import { MockTransparentProvider } from "./MockTransparentProvider";

describe("SearchResultItem component", () => {
  // Sample anime item to use in tests
  const sampleItem = {
    id: 123,
    title: { romaji: "Sample Anime" },
    coverImage: { medium: "http://example.com/sample.jpg" },
  };

  it("toggles transparency on click and preserves state between renders, resetting on full reload", () => {
    const { container, rerender, unmount } = render(
      <BrowserRouter>
        <MockTransparentProvider>
          <SearchResultItem item={sampleItem} />
        </MockTransparentProvider>
      </BrowserRouter>
    );

    const resultItemDiv = container.querySelector(".search-result-item")!;
    expect(resultItemDiv).not.toHaveClass("toggled");

    fireEvent.click(resultItemDiv);
    expect(resultItemDiv).toHaveClass("toggled"); // now 50% transparent

    // Second Click: simulate another click to toggle transparency off (removes .toggled)
    fireEvent.click(resultItemDiv);
    expect(resultItemDiv).not.toHaveClass("toggled"); // back to full opacity

    // Toggle on again to test persistence in next step
    fireEvent.click(resultItemDiv);
    expect(resultItemDiv).toHaveClass("toggled");

    rerender(
      <BrowserRouter>
        <MockTransparentProvider>
          <SearchResultItem item={sampleItem} />
        </MockTransparentProvider>
      </BrowserRouter>
    );
    const resultItemDivAfter = container.querySelector(".search-result-item")!;
    // The item should retain the .toggled class (still transparent)
    expect(resultItemDivAfter).toHaveClass("toggled");

    // Full Page Reload Reset:
    // Unmount the provider (simulate page reload, which clears context state)
    unmount();
    // Render again from scratch with a new provider instance
    const { container: newContainer } = render(
      <BrowserRouter>
        <MockTransparentProvider>
          <SearchResultItem item={sampleItem} />
        </MockTransparentProvider>
      </BrowserRouter>
    );
    const resultItemDivNew = newContainer.querySelector(".search-result-item")!;
    // The item should reset to non-transparent (no .toggled class)
    expect(resultItemDivNew).not.toHaveClass("toggled");
  });
});
