import { describe, expect, it } from "vitest";
import { EVRouter } from "../lib/ai/ev-routing.js";

describe("EVRouter", () => {
  it("calculates energy cost for a flat road segment", () => {
    const router = new EVRouter({ mass: 1500, regenEfficiency: 0.7 });
    const edge = {
      distance: 1000,
      startElevation: 0,
      endElevation: 0,
      averageSpeed: 15
    };
    const energy = router.calculateEdgeEnergy(edge);
    expect(energy).toBeGreaterThan(0);
  });

  it("calculates regenerative energy recovery on a downhill segment", () => {
    const router = new EVRouter({ mass: 1500, regenEfficiency: 0.7 });
    const uphillEdge   = { distance: 500, startElevation: 0,   endElevation: 100, averageSpeed: 10 };
    const downhillEdge = { distance: 500, startElevation: 100, endElevation: 0,   averageSpeed: 10 };
    const uphillEnergy   = router.calculateEdgeEnergy(uphillEdge);
    const downhillEnergy = router.calculateEdgeEnergy(downhillEdge);
    expect(uphillEnergy).toBeGreaterThan(downhillEnergy);
  });

  it("finds an energy-efficient path through a graph (array-based nodes)", () => {
    const router = new EVRouter();
    // The EVRouter expects graph.nodes to be iterable (array)
    const graph = {
      nodes: [
        { id: "A", edges: [{ to: "B", distance: 1000, startElevation: 0, endElevation: 0,  averageSpeed: 15 }] },
        { id: "B", edges: [{ to: "C", distance: 1000, startElevation: 0, endElevation: 50, averageSpeed: 15 }] },
        { id: "C", edges: [] }
      ]
    };
    const result = router.findEnergyEfficientPath(graph, "A", "C");
    expect(result).toBeDefined();
  });
});
