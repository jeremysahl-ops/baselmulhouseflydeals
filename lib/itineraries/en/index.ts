import type { RawItineraries } from '../types';
import { EN_PART1 } from './part1';
import { EN_PART2 } from './part2';
import { EN_PART3 } from './part3';
import { EN_PART4 } from './part4';
import { EN_PART5 } from './part5';
import { EN_PART6 } from './part6';

// Programmes en anglais. Une destination absente retombe sur le français.
export const EN_ITINERARIES: RawItineraries = { ...EN_PART1, ...EN_PART2, ...EN_PART3, ...EN_PART4, ...EN_PART5, ...EN_PART6 };
