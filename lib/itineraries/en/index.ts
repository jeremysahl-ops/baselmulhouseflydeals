import type { RawItineraries } from '../types';
import { EN_PART1 } from './part1';
import { EN_PART2 } from './part2';
import { EN_PART3 } from './part3';
import { EN_PART4 } from './part4';
import { EN_PART5 } from './part5';
import { EN_PART6 } from './part6';
import { EN_PART7 } from './part7';
import { EN_PART8 } from './part8';
import { EN_PART9 } from './part9';
import { EN_PART10 } from './part10';

// Programmes en anglais. Une destination absente retombe sur le français.
export const EN_ITINERARIES: RawItineraries = { ...EN_PART1, ...EN_PART2, ...EN_PART3, ...EN_PART4, ...EN_PART5, ...EN_PART6, ...EN_PART7, ...EN_PART8, ...EN_PART9, ...EN_PART10 };
