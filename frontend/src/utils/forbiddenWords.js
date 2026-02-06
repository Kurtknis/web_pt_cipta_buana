// Forbidden words - loaded from forbidden_word.txt
let forbiddenWordsCache = null;

const loadForbiddenWords = async () => {
  if (forbiddenWordsCache !== null) {
    return forbiddenWordsCache;
  }

  try {
    const response = await fetch('/forbidden_word.txt');
    const text = await response.text();
    forbiddenWordsCache = text
      .split('\n')
      .map(word => word.trim().toLowerCase())
      .filter(word => word.length > 0);
    return forbiddenWordsCache;
  } catch (error) {
    console.error('Error loading forbidden words:', error);
    // Fallback to empty array if file can't be loaded
    forbiddenWordsCache = [];
    return forbiddenWordsCache;
  }
};

export const checkForbiddenWords = async (text) => {
  const forbiddenWords = await loadForbiddenWords();
  const textLower = text.toLowerCase();
  
  for (const word of forbiddenWords) {
    if (textLower.includes(word)) {
      return {
        hasForbiddenWords: true,
        message: `Deskripsi mengandung kata yang tidak diperbolehkan. Silakan perbaiki deskripsi Anda.`
      };
    }
  }
  
  return {
    hasForbiddenWords: false,
    message: ''
  };
};
