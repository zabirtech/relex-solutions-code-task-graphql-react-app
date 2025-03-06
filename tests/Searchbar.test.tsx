import React from "react";
import { render, fireEvent, act } from "@testing-library/react";
import SearchBar from "../src/components/SearchBar";
import { debounce } from "../src/utils/debounce"; // Ensure debounce is imported if used

jest.useFakeTimers();

describe("SearchBar debounce", () => {
  it("should update the query once after rapid input", () => {
    const setQueryMock = jest.fn();
    const inputRef = React.createRef<HTMLInputElement>();
    const { getByPlaceholderText } = render(
      <SearchBar
        query=""
        setQuery={debounce(setQueryMock, 300)}
        inputRef={inputRef}
      />
    );

    const input = getByPlaceholderText("Search for anime...");

    // Simulate rapid typing events.
    fireEvent.change(input, { target: { value: "a" } });
    fireEvent.change(input, { target: { value: "ab" } });
    fireEvent.change(input, { target: { value: "abc" } });

    // Immediately, the debounced function should not have been called.
    expect(setQueryMock).not.toHaveBeenCalled();

    // Advance timers beyond the debounce delay (300ms).
    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Only the last input should trigger a call.
    expect(setQueryMock).toHaveBeenCalledTimes(1);
    expect(setQueryMock).toHaveBeenCalledWith("abc");
  });
});
