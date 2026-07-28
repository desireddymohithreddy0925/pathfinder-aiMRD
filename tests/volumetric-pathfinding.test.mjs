import { describe, expect, it } from "vitest";
import { VolumetricPathfinder } from "../lib/ai/volumetric-pathfinding.js";

describe("VolumetricPathfinder", () => {
  it("loads obstacles into the octree without error", () => {
    const bounds = { x: 0, y: 0, z: 0, width: 100, height: 100, depth: 100 };
    const pathfinder = new VolumetricPathfinder(bounds);
    const obstacles = [
      { x: 20, y: 20, z: 20 },
      { x: 50, y: 50, z: 50 }
    ];
    expect(() => pathfinder.loadObstacles(obstacles)).not.toThrow();
  });

  it("finds a 3D volumetric path between two waypoints", () => {
    const bounds = { x: 0, y: 0, z: 0, width: 100, height: 100, depth: 100 };
    const pathfinder = new VolumetricPathfinder(bounds);
    const start = { x: 0, y: 0, z: 0 };
    const goal  = { x: 80, y: 80, z: 80 };
    const path = pathfinder.findPath3D(start, goal);
    expect(path).toBeDefined();
    expect(path.length).toBeGreaterThan(0);
    // First waypoint should be the start
    expect(path[0]).toEqual(start);
    // Last waypoint should reach the goal
    const last = path[path.length - 1];
    expect(last.x).toBe(goal.x);
    expect(last.y).toBe(goal.y);
    expect(last.z).toBe(goal.z);
  });
});
