import { Letter, Word } from "@/types";
import axios from "axios";

export const consonants = "BCDFGHJKLMNPQRSTVWXYZ";
export const vowels = "AEIOU";
export const alphabet = consonants + vowels;
export const numVowels = 3;
export const numConsonants = 5;
export const generateRandomSequence = (): Letter[] => {
  const randomVowels = [...Array(numVowels)].map(
    (e) => vowels[Math.floor(Math.random() * vowels.length)]
  );
  const randomConsonants = [...Array(numConsonants)].map(
    (e) => consonants[Math.floor(Math.random() * consonants.length)]
  );
  console.log(randomVowels);
  const seq = randomVowels.concat(randomConsonants);
  return seq.map((letter, index) => ({
    value: letter,
    id: index,
    active: false,
  }));
};

export const verifyWord = async (word: string): Promise<Word | null> => {
  // TODO: use dictionary API to verify word
  const response = await axios.get(
    `https://dictionaryapi.dev/api/v2/entries/end/${word}`
  );
  if (response.status == 404) {
    return null;
  } else {
    return <Word>{
      definition: response.data[0].meanings[0].definitions[0].definition,
      letters: word,
    };
  }
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
