import { fireEvent, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import SearchResultItem from "../src/components/SearchResultItem";
import { TransparentProvider } from "../src/context/TransparentContext";

describe("SearchResultItem component", () => {
  // Sample anime item to use in tests
  const sampleItem = {
    id: 123,
    title: { romaji: "Sample Anime" },
    coverImage: { medium: "http://example.com/sample.jpg" },
  };

  it("toggles transparency on click and preserves state between renders, resetting on full reload", () => {
    //Initial Render: wrap in TransparentProvider and BrowserRouter
    const { container, rerender, unmount } = render(
      <BrowserRouter>
        <TransparentProvider>
          <SearchResultItem item={sampleItem} />
        </TransparentProvider>
      </BrowserRouter>
    );

    const resultItemDiv = container.querySelector(".search-result-item")!;
    // Initially, item should not have the 'toggled' class (full opacity)
    expect(resultItemDiv).not.toHaveClass("toggled");

    // First Click: simulate click to toggle transparency on (adds .toggled class)
    fireEvent.click(resultItemDiv);
    expect(resultItemDiv).toHaveClass("toggled"); // now 50% transparent

    // Second Click: simulate another click to toggle transparency off (removes .toggled)
    fireEvent.click(resultItemDiv);
    expect(resultItemDiv).not.toHaveClass("toggled"); // back to full opacity

    // Toggle on again to test persistence in next step
    fireEvent.click(resultItemDiv);
    expect(resultItemDiv).toHaveClass("toggled");

    // Persist State Across Searches:
    // Simulate a different search result by removing the item, but keep provider mounted
    // TODO: Added <div /> as a child to TransparentProvider to fix the 'children' prop error. Consider using a mock context provider for a more robust solution.
    rerender(
      <BrowserRouter>
        <TransparentProvider>
          <div />
          {/* No SearchResultItem rendered, simulating a new search query without this item */}
        </TransparentProvider>
      </BrowserRouter>
    );
    // Render the same item again (provider still mounted, so state should persist)
    rerender(
      <BrowserRouter>
        <TransparentProvider>
          <SearchResultItem item={sampleItem} />
        </TransparentProvider>
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
        <TransparentProvider>
          <SearchResultItem item={sampleItem} />
        </TransparentProvider>
      </BrowserRouter>
    );
    const resultItemDivNew = newContainer.querySelector(".search-result-item")!;
    // The item should reset to non-transparent (no .toggled class)
    expect(resultItemDivNew).not.toHaveClass("toggled");
  });
});
