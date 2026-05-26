import { sum, legacyDiscount } from "../src/app.js";

test("sum deve somar dois números", () => {
  expect(sum(2, 3)).toBe(5);
});

test("legacyDiscount deve subtrair 10", () => {
  expect(legacyDiscount(100)).toBe(90);
});
