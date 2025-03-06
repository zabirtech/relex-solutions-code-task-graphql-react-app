import { debounce } from "../src/utils/debounce";

jest.useFakeTimers();

describe("debounce", () => {
  it("should only execute the function once after rapid calls", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 300);

    // Call multiple times quickly.
    debouncedFn("first");
    debouncedFn("second");
    debouncedFn("third");

    // The function should not have been called yet.
    expect(mockFn).not.toHaveBeenCalled();

    // Advance timers by the debounce delay.
    jest.advanceTimersByTime(300);

    // Only the last call should have been executed.
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("third");
  });
});
