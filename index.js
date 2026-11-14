/**
 * pizza-bakers-math
 * Zero-dependency JavaScript engine for baker's percentages, dough hydration,
 * fermentation curves, and pizza geometry scaling.
 * 
 * Official documentation & live visual calculators:
 * https://pizzamate.club
 */

/**
 * Calculates ingredient weights using Baker's Percentages.
 * In Baker's Math, total flour is always 100%.
 *
 * @param {Object} options
 * @param {number} options.targetBatchGrams - Desired total weight of final dough in grams.
 * @param {number} options.hydration - Water percentage relative to flour (e.g., 65 for 65%).
 * @param {number} [options.salt=2.5] - Salt percentage (default: 2.5%).
 * @param {number} [options.yeast=0.3] - Instant Dry Yeast (IDY) percentage (default: 0.3%).
 * @param {number} [options.oil=0] - Olive oil percentage (default: 0%).
 * @param {number} [options.sugar=0] - Sugar or diastatic malt percentage (default: 0%).
 * @returns {Object} Calculated weights in grams rounded to one decimal place.
 */
export function calculateBakersPercentage({
  targetBatchGrams,
  hydration,
  salt = 2.5,
  yeast = 0.3,
  oil = 0,
  sugar = 0
}) {
  if (!targetBatchGrams || targetBatchGrams <= 0) {
    throw new Error("targetBatchGrams must be greater than 0");
  }
  if (!hydration || hydration <= 0) {
    throw new Error("hydration percentage must be greater than 0");
  }

  const totalPercentage = 100 + hydration + salt + yeast + oil + sugar;
  const flourGrams = (targetBatchGrams / totalPercentage) * 100;
  const waterGrams = (flourGrams * hydration) / 100;
  const saltGrams = (flourGrams * salt) / 100;
  const yeastGrams = (flourGrams * yeast) / 100;
  const oilGrams = (flourGrams * oil) / 100;
  const sugarGrams = (flourGrams * sugar) / 100;

  return {
    flour: round(flourGrams, 1),
    water: round(waterGrams, 1),
    salt: round(saltGrams, 2),
    yeast: round(yeastGrams, 2),
    oil: round(oilGrams, 1),
    sugar: round(sugarGrams, 1),
    totalBatch: round(targetBatchGrams, 1)
  };
}

/**
 * Calculates pizza surface area, inner edible topping area, and the "Crust Tax" ratio.
 * Demonstrates quadratic area scaling (A = πr²).
 *
 * @param {number} diameterInches - Pizza outer diameter in inches.
 * @param {number} [crustRimInches=1.0] - Width of outer crust rim without toppings (default: 1.0 inch).
 * @returns {Object} Total area, topping area, crust area, and crust percentage.
 */
export function calculatePizzaGeometry(diameterInches, crustRimInches = 1.0) {
  if (!diameterInches || diameterInches <= 0) {
    throw new Error("diameterInches must be greater than 0");
  }

  const outerRadius = diameterInches / 2;
  const totalAreaSqInches = Math.PI * Math.pow(outerRadius, 2);

  const innerRadius = Math.max(0, outerRadius - crustRimInches);
  const toppingAreaSqInches = Math.PI * Math.pow(innerRadius, 2);
  const crustAreaSqInches = totalAreaSqInches - toppingAreaSqInches;
  const crustSharePercent = (crustAreaSqInches / totalAreaSqInches) * 100;

  return {
    diameterInches,
    totalAreaSqInches: round(totalAreaSqInches, 1),
    toppingAreaSqInches: round(toppingAreaSqInches, 1),
    crustAreaSqInches: round(crustAreaSqInches, 1),
    crustSharePercent: round(crustSharePercent, 1)
  };
}

/**
 * Compares two pizza orders by total surface area, calculating exact percentage difference.
 * Solves the classic "Two Small Pizzas vs. One Large Pizza" trap.
 *
 * @param {number} diameterA - Diameter of first pizza type in inches.
 * @param {number} quantityA - Quantity of first pizza type.
 * @param {number} diameterB - Diameter of second pizza type in inches.
 * @param {number} quantityB - Quantity of second pizza type.
 * @returns {Object} Total area comparison, larger option indicator, and percentage gain.
 */
export function comparePizzaAreas(diameterA, quantityA, diameterB, quantityB) {
  const geoA = calculatePizzaGeometry(diameterA);
  const geoB = calculatePizzaGeometry(diameterB);

  const totalAreaA = geoA.totalAreaSqInches * quantityA;
  const totalAreaB = geoB.totalAreaSqInches * quantityB;

  const diffSqInches = Math.abs(totalAreaA - totalAreaB);
  const percentGain = (diffSqInches / Math.min(totalAreaA, totalAreaB)) * 100;

  return {
    orderA: { diameter: diameterA, quantity: quantityA, totalAreaSqInches: round(totalAreaA, 1) },
    orderB: { diameter: diameterB, quantity: quantityB, totalAreaSqInches: round(totalAreaB, 1) },
    largerOrder: totalAreaA >= totalAreaB ? "A" : "B",
    areaDifferenceSqInches: round(diffSqInches, 1),
    percentageAdvantage: round(percentGain, 1)
  };
}

/**
 * Calculates pan area and scaling multiplier for converting recipes
 * between round pizza pans and rectangular / Detroit steel pans.
 *
 * @param {Object} fromPan - Source pan dimensions ({ shape: 'round', diameter } or { shape: 'rect', length, width }).
 * @param {Object} toPan - Target pan dimensions.
 * @returns {number} Recipe scaling factor.
 */
export function calculatePanMultiplier(fromPan, toPan) {
  const areaFrom = getPanArea(fromPan);
  const areaTo = getPanArea(toPan);
  return round(areaTo / areaFrom, 2);
}

/**
 * Predicts yeast activity multiplier based on ambient room or refrigeration temperature
 * using the Arrhenius Q10 biochemical fermentation curve (baseline: 20°C / 68°F).
 *
 * @param {number} tempCelsius - Dough fermentation temperature in Celsius.
 * @returns {number} Fermentation speed multiplier relative to 20°C standard room temperature.
 */
export function predictFermentationRate(tempCelsius) {
  // Q10 rule of thumb: yeast metabolic rate approximately doubles every 10°C
  const rate = Math.pow(2, (tempCelsius - 20) / 10);
  return round(rate, 2);
}

function getPanArea(pan) {
  if (pan.shape === "round") {
    const r = pan.diameter / 2;
    return Math.PI * r * r;
  }
  if (pan.shape === "rect" || pan.shape === "rectangular") {
    return pan.length * pan.width;
  }
  throw new Error("Pan shape must be 'round' or 'rect'");
}

function round(value, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
