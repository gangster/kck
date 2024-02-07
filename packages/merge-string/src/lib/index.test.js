import { describe, expect, test } from '@jest/globals';
import { simpleMergeString, complexMergeString } from './index.js';

describe('mergeString', () => {
  test('merges 2 alphanumeric ASCII strings of the same length', () => {
    expect(simpleMergeString('aaa', 'bbb')).toBe('ababab');
  });
  test('merges 2 alphanumeric ASCII strings of varying lengths', () => {
    expect(simpleMergeString('abc', 'stuvwx')).toBe('asbtcuvwx');
  });
  test('merges 2 ASCII strings containing whitespace and special characters', () => {
    expect(simpleMergeString('a1*', 'b^ (')).toBe('ab1^* (');
  });
  test('merges ASCII string with empty string', () => {
    expect(simpleMergeString('abcde', '')).toBe('abcde');
    expect(simpleMergeString('', 'abcde')).toBe('abcde');
  });

  test('merges 2 unicode strings of the same length', () => {
    expect(simpleMergeString('🥊🙌', '👏😂')).toBe('🥊👏🙌😂');
  });
  test('merges mix of ASCII/Unicode strings of the same length', () => {
    expect(simpleMergeString('🥊🙌a', '👏😂b')).toBe('🥊👏🙌😂ab');
  });

  test('merges 2 empty strings', () => {
    expect(simpleMergeString('', '')).toBe('');
  });
  test('merges 2 null strings', () => {
    expect(simpleMergeString(null, null)).toBe('');
  });

  test('merges 2 undefined strings', () => {
    expect(simpleMergeString(undefined, undefined)).toBe('');
  });
});

describe('complexMergeString', () => {
  test('merges Unicode strings with modifiers', () => {
    expect(complexMergeString('👍🏽👐🏾🤝🏿', '👏😂b')).toBe('👍🏽👏👐🏾😂🤝🏿b');
  });
});
