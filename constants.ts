import { GradeOption } from './types';

// Standard mapping. Can be adjusted based on specific university rules.
export const GRADE_OPTIONS: GradeOption[] = [
  { label: 'أ+ (A+)', value4: 4.0, value5: 5.0 },
  { label: 'أ (A)', value4: 3.75, value5: 4.75 },
  { label: 'ب+ (B+)', value4: 3.5, value5: 4.5 },
  { label: 'ب (B)', value4: 3.0, value5: 4.0 },
  { label: 'ج+ (C+)', value4: 2.5, value5: 3.5 },
  { label: 'ج (C)', value4: 2.0, value5: 3.0 },
  { label: 'د+ (D+)', value4: 1.5, value5: 2.5 },
  { label: 'د (D)', value4: 1.0, value5: 2.0 },
  { label: 'هـ (F)', value4: 0.0, value5: 1.0 },
];

export const HOURS_OPTIONS = [1, 2, 3, 4, 5, 6];

export const INITIAL_COURSES = [
  { id: '1', name: 'الرياضيات 101', gradeLabel: 'أ+ (A+)', credits: 3 },
  { id: '2', name: 'الفيزياء العامة', gradeLabel: 'ب+ (B+)', credits: 4 },
];
