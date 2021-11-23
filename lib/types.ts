import {
  Book,
  Chapter,
  GrammarCard,
  VocabularyCard,
  VocabularyCardList,
  WordCard,
} from ".prisma/client";

export interface Type {
  id: string;
  name: string;
}

export interface Option {
  id: string | number;
  name: string;
  [_: string]: any;
}

export type VocabularyCardListWithCards = {
  vocabularyCards: any[];
} & VocabularyCardList;

export type ChapterWithCard = {
  vocabularyCard?: VocabularyCard[];
  grammarCard?: GrammarCard;
  wordCard?: WordCard;
} & Chapter;

export type BookWithChapter = {
  chapters: Chapter[];
} & Book;
