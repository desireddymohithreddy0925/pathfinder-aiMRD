import { describe, expect, it, vi } from "vitest";
import { WeatherAwareRouter } from "../lib/ai/weather-routing.js";

describe("WeatherAwareRouter", () => {
  it("updates graph node edge weights based on severe weather", async () => {
    const router = new WeatherAwareRouter("fake-api-key");
    // Stub weather fetch to return "Snow" condition
    vi.spyOn(router, "fetchWeatherForLocation").mockResolvedValue("Snow");

    const graph = {
      nodes: [
        {
          id: "A",
          lat: 51.5,
          lon: -0.1,
          edges: [{ to: "B", baseWeight: 10 }]
        }
      ]
    };

    const updated = await router.updateEdgeWeights(graph, true);
    expect(updated).toBeDefined();
    expect(updated.nodes[0].edges[0].currentWeight).toBeGreaterThan(10);
  });

  it("applies no penalty when weather is clear", async () => {
    const router = new WeatherAwareRouter("fake-api-key");
    vi.spyOn(router, "fetchWeatherForLocation").mockResolvedValue("Clear");

    const graph = {
      nodes: [
        {
          id: "A",
          lat: 51.5,
          lon: -0.1,
          edges: [{ to: "B", baseWeight: 10 }]
        }
      ]
    };

    const updated = await router.updateEdgeWeights(graph, true);
    // Clear weather should keep weight at base
    expect(updated.nodes[0].edges[0].currentWeight).toBe(10);
  });
});
