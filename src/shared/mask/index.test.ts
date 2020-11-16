import {MASKS} from "./index";

describe('mask', () => {
  test('currency', () => {
    expect(MASKS.CURRENCY(0)).toBe('R$ 0.00');
    expect(MASKS.CURRENCY(0.1)).toBe('R$ 0.10');
    expect(MASKS.CURRENCY(0.12)).toBe('R$ 0.12');
    expect(MASKS.CURRENCY(1)).toBe('R$ 1.00');
    expect(MASKS.CURRENCY(1.0)).toBe('R$ 1.00');
    expect(MASKS.CURRENCY(1.12)).toBe('R$ 1.12');
    expect(MASKS.CURRENCY(10)).toBe('R$ 10.00');
    expect(MASKS.CURRENCY(150)).toBe('R$ 150.00');
    expect(MASKS.CURRENCY(150.5)).toBe('R$ 150.50');
    expect(MASKS.CURRENCY(1000)).toBe('R$ 1,000.00');
    expect(MASKS.CURRENCY(1000.2)).toBe('R$ 1,000.20');
    expect(MASKS.CURRENCY(1000.24)).toBe('R$ 1,000.24');
  });
});
