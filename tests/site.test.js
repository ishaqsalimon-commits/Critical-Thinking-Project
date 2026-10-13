import { describe, it, expect } from "vitest";
import { formatProjectName } from "../site/site.js";

describe("formatProjectName", () => {
  it("converts a hyphenated project name into a readable title", () => {
    expect(formatProjectName("critical-thinking-project"))
      .toBe("Critical Thinking Project");
  });

  it("handles a single word", () => {
    expect(formatProjectName("devops")).toBe("Devops");
  });

  it("ignores empty segments between hyphens", () => {
    expect(formatProjectName("critical--project"))
      .toBe("Critical Project");
  });
});
