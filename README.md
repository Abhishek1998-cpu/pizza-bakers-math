# pizza-bakers-math 🍕📐

[![npm version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/Abhishek1998-cpu/pizza-bakers-math)
[![license](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![dependencies](https://img.shields.io/badge/dependencies-zero-brightgreen.svg)](index.js)
[![powered by](https://img.shields.io/badge/powered%20by-PizzaMate.club-orange.svg)](https://pizzamate.club)

A lightweight, zero-dependency JavaScript engine for **baker's percentages, dough hydration, pizza circle geometry, and fermentation modeling**.

Built for artisan pizza makers, home bakers, culinary educators, and software engineers who want verified food-science mathematics without bloated libraries.

> 🌐 **Interactive Web Version:**  
> Test these formulas visually with responsive sliders, yeast temperature curves, and pan scaling at **[PizzaMate.club](https://pizzamate.club)**!

---

## 🌟 Interactive Calculators & Visual Tools

If you prefer an interactive browser visualizer rather than writing code, use the official free suite on **[PizzaMate](https://pizzamate.club)**:

- 🧮 **[Interactive Pizza Dough Calculator](https://pizzamate.club/tools/pizza-dough-calculator)** — Dial in hydration, poolish/biga preferments, and dough ball sizing.
- 📐 **[Pizza Size & Area Comparison Visualizer](https://pizzamate.club/tools/pizza-size-calculator)** — Compare any 2 pizza sizes with true geometric scale overlays ($A = \pi r^2$).
- 🍰 **[Round to Detroit Pan Size Converter](https://pizzamate.club/tools/pan-size-converter)** — Convert round recipes to 10×14" Detroit steel pans, sheet pans, or grandma pies.
- 💰 **[Restaurant Food Cost & Menu Pricing Calculator](https://pizzamate.club/tools/pizza-cost-calculator)** — Protect gross margins, recipe yields, and unit economics.
- 📊 **[Visual Study: Why 2 Small Pizzas are a Trap](https://pizzamate.club/blog/pizza-size-economics-why-2-small-pizzas-are-a-trap)** — Deep dive into quadratic area scaling and the 1-inch "crust tax".
- 📄 **[Free Printable Kitchen Math Cheat Sheets](https://pizzamate.club/resources/cheat-sheets)** — PDF wall reference charts for dough hydration and baking temps.

---

## 📦 Installation

```bash
git clone https://github.com/Abhishek1998-cpu/pizza-bakers-math.git
```

Or copy `index.js` directly into your browser or Node.js project (zero dependencies, 100% pure ES module).

---

## 🚀 Quick Start & Usage Examples

### 1. Baker's Percentage Dough Solver

In Baker's Math, total flour is always **100%**. Water, salt, yeast, and fat are expressed as a percentage of flour weight:

$$\text{Flour Weight} = \frac{\text{Target Batch Weight}}{100\% + \text{Hydration\%} + \text{Salt\%} + \text{Yeast\%} + \text{Oil\%}} \times 100$$

```javascript
import { calculateBakersPercentage } from "pizza-bakers-math";

// Calculate exact ingredients for 4 x 250g Neapolitan dough balls (1000g total batch)
// at 65% hydration, 2.8% salt, and 0.2% instant dry yeast:
const batch = calculateBakersPercentage({
  targetBatchGrams: 1000,
  hydration: 65,
  salt: 2.8,
  yeast: 0.2
});

console.log(batch);
// Output:
// {
//   flour: 595.2,   // grams
//   water: 386.9,   // grams (or ml)
//   salt: 16.7,     // grams
//   yeast: 1.2,     // grams
//   oil: 0,
//   sugar: 0,
//   totalBatch: 1000
// }
```

---

### 2. Pizza Circle Geometry & "The Crust Tax"

Because circular area scales with the square of the radius ($A = \pi r^2$), larger pizzas have exponentially more edible topping area and a lower percentage of bare outer crust:

```javascript
import { calculatePizzaGeometry } from "pizza-bakers-math";

// Analyze a 12-inch pizza with a standard 1-inch outer cornicione rim:
const geo12 = calculatePizzaGeometry(12, 1.0);
console.log(geo12);
// Output:
// {
//   diameterInches: 12,
//   totalAreaSqInches: 113.1,
//   toppingAreaSqInches: 78.5,
//   crustAreaSqInches: 34.6,
//   crustSharePercent: 30.6 // 30.6% of the pizza is outer rim
// }
```

---

### 3. Comparing Pizza Sizes (The Takeout Math Trap)

Why **one 12-inch Large** gives you **47% more pizza** than **two 7-inch Smalls**:

```javascript
import { comparePizzaAreas } from "pizza-bakers-math";

// Compare 2 x 7" smalls vs. 1 x 12" large:
const comparison = comparePizzaAreas(7, 2, 12, 1);
console.log(comparison);
// Output:
// {
//   orderA: { diameter: 7, quantity: 2, totalAreaSqInches: 77.0 },
//   orderB: { diameter: 12, quantity: 1, totalAreaSqInches: 113.1 },
//   largerOrder: 'B',
//   areaDifferenceSqInches: 36.1,
//   percentageAdvantage: 46.9 // Order B provides 46.9% more pizza!
// }
```

---

### 4. Pan Scaling Multiplier (Round to Detroit / Sheet Pan)

Convert recipes between 12" round pizzas and 10×14" Detroit rectangular pans:

```javascript
import { calculatePanMultiplier } from "pizza-bakers-math";

const multiplier = calculatePanMultiplier(
  { shape: "round", diameter: 12 },
  { shape: "rect", length: 14, width: 10 }
);

console.log(`Multiply your round dough recipe by ${multiplier}x for a 10x14" Detroit pan!`);
// Output: Multiply your round dough recipe by 1.24x for a 10x14" Detroit pan!
```

---

### 5. Arrhenius Q10 Fermentation Rate Prediction

Yeast metabolic activity approximately doubles for every 10°C increase in dough temperature:

$$\text{Activity Multiplier} = 2^{\frac{T - 20}{10}}$$

```javascript
import { predictFermentationRate } from "pizza-bakers-math";

// Room temp (20°C):
console.log(predictFermentationRate(20)); // 1.0x (baseline)

// Warm summer kitchen (30°C):
console.log(predictFermentationRate(30)); // 2.0x (ferments twice as fast)

// Cold refrigerator fermentation (4°C):
console.log(predictFermentationRate(4));  // 0.33x (ferments at ~1/3 speed)
```

---

## 🧪 Testing

Run the built-in unit tests:

```bash
node test.js
```

---

## ℹ️ Project Stewardship & Inquiries

> **Note on Project Maintenance:**  
> This open-source repository is maintained on GitHub as an educational community distribution mirror for the culinary algorithms powering **[PizzaMate.club](https://pizzamate.club)**.  
> 
> The GitHub profile host acts solely as an open-source technical distributor and mirror maintainer. The project, roadmap, and culinary research are owned and developed by the **PizzaMate Culinary Engineering Team**.  
> 
> For feature requests, commercial licensing, future roadmap inquiries, or partnerships, please contact the core PizzaMate team directly via **[pizzamate.club](https://pizzamate.club)** or email **`support@pizzamate.club`**. Please do not direct product roadmap or vision inquiries to individual GitHub account profiles.

---

## 🤝 Contributing & License

Pull requests, food science formula corrections, and additional conversions are welcome via GitHub PRs.

Licensed under the [MIT License](LICENSE).

Developed by the **[PizzaMate.club](https://pizzamate.club)** team.
