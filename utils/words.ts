import { Letter, Word } from "@/types";
import axios from "axios";

export const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
export const vowels = "AEIOU";
export const alphabet = consonants + vowels;
export const numVowels = 5;
export const numConsonants = 8;
export const generateRandomSequence = (): Letter[] => {
  const randomVowels = [...Array(numVowels)].map(
    (e) => vowels[Math.floor(Math.random() * vowels.length)]
  );
  const randomConsonants = [...Array(numConsonants)].map(
    (e) => consonants[Math.floor(Math.random() * consonants.length)]
  );
  const seq = randomVowels.concat(randomConsonants);
  return seq.map((letter, index) => ({
    value: letter,
    id: index,
    active: false,
  }));
};

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
