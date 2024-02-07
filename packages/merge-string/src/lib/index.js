// Defines a function to merge two strings by interleaving their characters.
export function simpleMergeString(a, b) {
  // If both input strings are empty or not provided, return an empty string.
  if (!a && !b) {
    return '';
  }
  // Converts string a into an array of characters.
  const arrayA = Array.from(a);
  // Converts string b into an array of characters.
  const arrayB = Array.from(b);
  // Initializes an array to hold the interleaved characters.
  const merged = [];

  // Iterates up to the length of the longer of the two arrays.
  for (let i = 0; i < Math.max(arrayA.length, arrayB.length); i++) {
    // If the current index is within the bounds of arrayA, add its character to the merged array.
    if (arrayA.length > i) {
      merged.push(arrayA[i]);
    }
    // If the current index is within the bounds of arrayB, add its character to the merged array.
    if (arrayB.length > i) {
      merged.push(arrayB[i]);
    }
  }
  // Joins the interleaved characters into a single string and returns it.
  return merged.join('');
}

// Defines a function to merge two strings by interleaving their grapheme clusters.
export function complexMergeString(a, b) {
  // If both input strings are empty or not provided, return an empty string.
  if (!a && !b) {
    return '';
  }

  // 💡 Had to look the next 3 lines up to figure out how to do this.
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });

  // Uses the segmenter to split string a into an array of grapheme clusters,
  // ensuring complex characters are correctly handled.
  const arrayA = [...segmenter.segment(a)].map((seg) => seg.segment);
  // Similarly, splits string b into an array of grapheme clusters.
  const arrayB = [...segmenter.segment(b)].map((seg) => seg.segment);
  const merged = [];

  for (let i = 0; i < Math.max(arrayA.length, arrayB.length); i++) {
    if (arrayA.length > i) {
      merged.push(arrayA[i]);
    }
    if (arrayB.length > i) {
      merged.push(arrayB[i]);
    }
  }

  // Joins the interleaved grapheme clusters into a single string and returns it.
  return merged.join('');
}
