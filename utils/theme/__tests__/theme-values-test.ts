/**
 * Unit tests for theme-values (pure functions)
 */
import {
  getSpacingPixelValue,
  getFontSizePixelValue,
  getDrawerWidth,
  getIconSize,
  getBorderRadius,
  getToastIconSize,
  getToastDismissIconSize,
} from '../theme-values';

describe('theme-values', () => {
  describe('getSpacingPixelValue', () => {
    it('returns 4 for compact', () => {
      expect(getSpacingPixelValue('compact')).toBe(4);
    });

    it('returns 12 for normal', () => {
      expect(getSpacingPixelValue('normal')).toBe(12);
    });

    it('returns 16 for relaxed', () => {
      expect(getSpacingPixelValue('relaxed')).toBe(16);
    });
  });

  describe('getFontSizePixelValue', () => {
    it('returns correct base size for small preference', () => {
      expect(getFontSizePixelValue('small', 'base')).toBe(14); // 16 * 0.875
    });

    it('returns correct base size for normal preference', () => {
      expect(getFontSizePixelValue('normal', 'base')).toBe(16);
    });

    it('returns correct base size for large preference', () => {
      expect(getFontSizePixelValue('large', 'base')).toBe(18); // 16 * 1.125
    });

    it('respects context (sm, lg, xs, xl)', () => {
      expect(getFontSizePixelValue('normal', 'xs')).toBe(12);
      expect(getFontSizePixelValue('normal', 'sm')).toBe(14);
      expect(getFontSizePixelValue('normal', 'lg')).toBe(18);
      expect(getFontSizePixelValue('normal', 'xl')).toBe(20);
    });
  });

  describe('getDrawerWidth', () => {
    it('returns 280 for compact', () => {
      expect(getDrawerWidth('compact')).toBe(280);
    });

    it('returns 320 for normal', () => {
      expect(getDrawerWidth('normal')).toBe(320);
    });

    it('returns 360 for relaxed', () => {
      expect(getDrawerWidth('relaxed')).toBe(360);
    });
  });

  describe('getIconSize', () => {
    it('returns 20 for small', () => {
      expect(getIconSize('small')).toBe(20);
    });

    it('returns 22 for normal', () => {
      expect(getIconSize('normal')).toBe(22);
    });

    it('returns 26 for large', () => {
      expect(getIconSize('large')).toBe(26);
    });
  });

  describe('getBorderRadius', () => {
    it('returns 6 for compact', () => {
      expect(getBorderRadius('compact')).toBe(6);
    });

    it('returns 8 for normal', () => {
      expect(getBorderRadius('normal')).toBe(8);
    });

    it('returns 12 for relaxed', () => {
      expect(getBorderRadius('relaxed')).toBe(12);
    });
  });

  describe('getToastIconSize', () => {
    it('returns 20 when no fontSize is passed', () => {
      expect(getToastIconSize()).toBe(20);
    });

    it('returns 18 for small', () => {
      expect(getToastIconSize('small')).toBe(18);
    });

    it('returns 20 for normal', () => {
      expect(getToastIconSize('normal')).toBe(20);
    });

    it('returns 22 for large', () => {
      expect(getToastIconSize('large')).toBe(22);
    });
  });

  describe('getToastDismissIconSize', () => {
    it('returns 16 when no fontSize is passed', () => {
      expect(getToastDismissIconSize()).toBe(16);
    });

    it('returns 14 for small', () => {
      expect(getToastDismissIconSize('small')).toBe(14);
    });

    it('returns 16 for normal', () => {
      expect(getToastDismissIconSize('normal')).toBe(16);
    });

    it('returns 18 for large', () => {
      expect(getToastDismissIconSize('large')).toBe(18);
    });
  });
});
