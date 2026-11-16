import type { RawItineraries } from '../types';
import { DE_PART1 } from './part1';
import { DE_PART2 } from './part2';
import { DE_PART3 } from './part3';
import { DE_PART4 } from './part4';

// Programmes en allemand. Une destination absente retombe sur le français.
export const DE_ITINERARIES: RawItineraries = { ...DE_PART1, ...DE_PART2, ...DE_PART3, ...DE_PART4 };
