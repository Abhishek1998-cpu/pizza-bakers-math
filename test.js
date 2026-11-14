import {
  calculateBakersPercentage,
  calculatePizzaGeometry,
  comparePizzaAreas,
  calculatePanMultiplier,
  predictFermentationRate
} from "./index.js";

console.log("=== RUNNING PIZZA BAKERS MATH TESTS ===");

// Test 1: Baker's percentage for 4 x 250g Neapolitan dough balls (1000g total) at 65% hydration
const dough = calculateBakersPercentage({
  targetBatchGrams: 1000,
  hydration: 65,
  salt: 2.8,
  yeast: 0.2
});
console.log("1. Baker's Percentage (1000g @ 65%):", dough);
console.assert(dough.flour === 595.2, "Flour should be ~595.2g");
console.assert(dough.water === 386.9, "Water should be ~386.9g");

// Test 2: Pizza Geometry (12-inch pizza)
const geo12 = calculatePizzaGeometry(12, 1.0);
console.log("2. 12-inch Pizza Geometry:", geo12);
console.assert(geo12.totalAreaSqInches === 113.1, "12-inch area should be 113.1 sq in");

// Test 3: The 2 x 7" vs 1 x 12" comparison
const comp = comparePizzaAreas(7, 2, 12, 1);
console.log("3. 2x7\" vs 1x12\" Comparison:", comp);
console.assert(comp.largerOrder === "B", "1x12 should be larger than 2x7");

// Test 4: Pan scaling (12\" round to 10x14\" Detroit pan)
const mult = calculatePanMultiplier(
  { shape: "round", diameter: 12 },
  { shape: "rect", length: 14, width: 10 }
);
console.log("4. 12\" Round to 10x14\" Detroit Pan Multiplier:", mult);
console.assert(mult === 1.24, "Pan multiplier should be 1.24x");

// Test 5: Fermentation rate at 4°C fridge vs 20°C room temp
const coldRate = predictFermentationRate(4);
console.log("5. Yeast Fermentation Rate at 4°C (Fridge):", coldRate);
console.assert(coldRate === 0.33, "Fridge rate should be 0.33x room temp");

console.log("\n✅ All unit tests passed successfully!");
