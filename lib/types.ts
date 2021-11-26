import {
  Book,
  Chapter,
  GrammarCard,
  GrammarCardList,
  KanjiCard,
  KanjiCardList,
  VocabularyCard,
  VocabularyCardList,
  WordCard,
  WordCardList,
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
  grammarCard?: GrammarCard[];
  wordCards?: WordCard[];
  kanjiCard?: KanjiCard[];
} & Chapter;

export type BookWithChapter = {
  chapters: Chapter[];
} & Book;

export type WordCardListWithCards = {
  wordCards: any[];
} & WordCardList;

export type KanjiCardListWithCards = {
  kanjiCards: any[];
} & KanjiCardList;

export type GrammarCardListWithCards = {
  grammarCards: any[];
} & GrammarCardList;