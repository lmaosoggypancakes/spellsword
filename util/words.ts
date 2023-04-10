import { Letter } from "@/types";

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

export const verifyWord = async (word: string): Promise<boolean> => {
  // TODO: use dictionary API to verify word
  return false;
};
