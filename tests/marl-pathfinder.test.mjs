import { describe, expect, it } from "vitest";
import { MARLPathfinder } from "../lib/ai/marl.js";

describe("MARLPathfinder", () => {
  it("registers agents and broadcasts intentions", () => {
    const pathfinder = new MARLPathfinder();
    pathfinder.registerAgent("agent-1", { x: 0, y: 0 });
    pathfinder.registerAgent("agent-2", { x: 5, y: 5 });

    const trajectory = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }];
    expect(() => pathfinder.broadcastIntention("agent-1", trajectory)).not.toThrow();
  });

  it("calculates a next step for a registered agent", () => {
    const pathfinder = new MARLPathfinder();
    pathfinder.registerAgent("agent-1", { x: 0, y: 0 });
    const step = pathfinder.calculateNextStep("agent-1");
    expect(step).toBeDefined();
    expect(step.action).toMatch(/adjust|forward/);
  });

  it("throws when broadcasting for an unregistered agent", () => {
    const pathfinder = new MARLPathfinder();
    expect(() => pathfinder.broadcastIntention("ghost", [])).toThrow("Agent not found");
  });
});
