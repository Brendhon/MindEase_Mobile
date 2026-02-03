/**
 * Unit tests for timer-helpers (pure functions)
 */
import { formatTime, isTimerCompleted } from '../timer-helpers';

describe('timer-helpers', () => {
  describe('formatTime', () => {
    it('formats zero as 00:00', () => {
      expect(formatTime(0)).toBe('00:00');
    });

    it('formats seconds only (under one minute)', () => {
      expect(formatTime(5)).toBe('00:05');
      expect(formatTime(59)).toBe('00:59');
    });

    it('formats minutes and seconds (MM:SS)', () => {
      expect(formatTime(60)).toBe('01:00');
      expect(formatTime(125)).toBe('02:05');
      expect(formatTime(3661)).toBe('61:01');
    });

    it('pads single digits with leading zero', () => {
      expect(formatTime(1)).toBe('00:01');
      expect(formatTime(600)).toBe('10:00');
    });
  });

  describe('isTimerCompleted', () => {
    it('returns true when remaining time is zero', () => {
      expect(isTimerCompleted(0)).toBe(true);
    });

    it('returns true when remaining time is negative', () => {
      expect(isTimerCompleted(-1)).toBe(true);
      expect(isTimerCompleted(-100)).toBe(true);
    });

    it('returns false when remaining time is positive', () => {
      expect(isTimerCompleted(1)).toBe(false);
      expect(isTimerCompleted(60)).toBe(false);
    });
  });
});
