import { cn } from '../utils';

describe('cn', () => {
  it('should merge class names correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('should handle conditional class names', () => {
    expect(cn('bg-red-500', { 'text-white': true, 'font-bold': false })).toBe('bg-red-500 text-white');
  });

  it('should override conflicting class names with tailwind-merge', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('should handle empty inputs', () => {
    expect(cn()).toBe('');
    expect(cn('')).toBe('');
    expect(cn(null)).toBe('');
    expect(cn(undefined)).toBe('');
  });

  it('should handle mixed valid and invalid inputs', () => {
    expect(cn('bg-red-500', null, 'text-white', undefined, { 'font-bold': true })).toBe('bg-red-500 text-white font-bold');
  });

  it('should handle arrays of class names', () => {
    expect(cn(['bg-red-500', 'text-white'], ['font-bold'])).toBe('bg-red-500 text-white font-bold');
  });

  it('should handle arrays with conditional class names', () => {
    expect(cn(['bg-red-500', { 'text-white': true }], [{ 'font-bold': false }, 'p-2'])).toBe('bg-red-500 text-white p-2');
  });
});
