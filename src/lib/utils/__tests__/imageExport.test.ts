import { describe, it, expect } from 'vitest';
import { sanitizeFilename } from '../imageExport';

describe('imageExport utilities', () => {
  describe('sanitizeFilename', () => {
    it('should convert text to lowercase', () => {
      expect(sanitizeFilename('MySnippet')).toBe('mysnippet');
    });

    it('should replace spaces with hyphens', () => {
      expect(sanitizeFilename('My Snippet Title')).toBe('my-snippet-title');
    });

    it('should replace special characters with hyphens', () => {
      expect(sanitizeFilename('My@Snippet#Title!')).toBe('my-snippet-title');
    });

    it('should remove leading and trailing hyphens', () => {
      expect(sanitizeFilename('!Snippet!')).toBe('snippet');
    });

    it('should collapse multiple hyphens into one', () => {
      expect(sanitizeFilename('My   Snippet   Title')).toBe('my-snippet-title');
    });

    it('should handle empty strings', () => {
      expect(sanitizeFilename('')).toBe('');
    });

    it('should handle strings with only special characters', () => {
      expect(sanitizeFilename('!@#$%')).toBe('');
    });
  });
});
