import { Letter, Word } from "@/types";
import axios from "axios";

// configurable constants
export const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
export const vowels = "AEIOU";
export const alphabet = consonants + vowels;
export const numVowels = 5;
export const numConsonants = 8;

/* given the pre-defined constants above, returns a sequence that satisfies the rules and constraints possible */
export const generateRandomSequence = (): Letter[] => {
  /* 
    piece by piece:

    [...Array(numVowels)] -> uses the spread operator to convert a list of length `numVowels` to an array
    .map(e => vowels[...]) -> map each item in the array (currently undefined) to a character in the `vowels` variable
    Math.floor(Math.random() * vowels.length) -> returns an index in the interval [0, vowels.length)
  */
  const randomVowels = [...Array(numVowels)].map(
    () => vowels[Math.floor(Math.random() * vowels.length)]
  );
  const randomConsonants = [...Array(numConsonants)].map(
    () => consonants[Math.floor(Math.random() * consonants.length)]
  );
  const seq = randomVowels.concat(randomConsonants); // append the two arrays together, then map them to match the Letter type with default values
  return seq.map((letter, index) => ({
    value: letter,
    id: index,
    active: false,
  }));
};

/* given a word, use the dictionary API to verify it's authenticity. if it's valid, then return its definition. */
export const verifyWord = async (word: string): Promise<Word | null> => {
  word = word.toUpperCase();
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const definition = response.data[0].meanings[0].definitions[0].definition;
    return <Word>{
      definition,
      letters: word,
    };
  } catch (err) {
    return null;
  }
};

export const getPoints = (word: string) => {
  // points = len(word) + round(consonants/vowels)
  // NOTE: assumes verifyWord(word) !== null (to avoid duplicate api requests and thus get rate limited easy)
  const chars = Array.from(word.toUpperCase());
  const numConsonants = chars.filter((char) =>
    consonants.includes(char)
  ).length;
  const numVowels = chars.filter((char) => vowels.includes(char)).length;
  const cvr = Math.round(numConsonants / numVowels);
  if (cvr == 0 || cvr === Infinity) {
    return chars.length;
  }
  return chars.length + cvr;
};
export const convertSequence = (seq: string): Letter[] => {
  return Array.from(seq).map((char, index) => {
    return {
      value: char,
      id: index,
      active: false,
    };
  });
};
