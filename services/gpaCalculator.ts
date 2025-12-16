import { Course, GPACalculationResult, GradeScale } from '../types';
import { GRADE_OPTIONS } from '../constants';

export const calculateGPA = (courses: Course[], scale: GradeScale): GPACalculationResult => {
  let totalPoints = 0;
  let totalCredits = 0;

  courses.forEach((course) => {
    const gradeInfo = GRADE_OPTIONS.find((g) => g.label === course.gradeLabel);
    if (gradeInfo && course.gradeLabel) {
      const gradeValue = scale === '4.0' ? gradeInfo.value4 : gradeInfo.value5;
      totalPoints += gradeValue * course.credits;
      totalCredits += course.credits;
    }
  });

  const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0.0;
  
  // Rating Logic
  let rating = '-';
  let colorClass = 'text-gray-400';

  if (totalCredits > 0) {
    // Normalize GPA to a percentage-ish to determine rating, or use scale thresholds
    const maxGPA = scale === '4.0' ? 4.0 : 5.0;
    const percentage = gpa / maxGPA;

    if (percentage >= 0.9) {
      rating = 'ممتاز مرتفع';
      colorClass = 'text-green-500 bg-green-50 dark:bg-green-900/20';
    } else if (percentage >= 0.85) {
        rating = 'ممتاز';
        colorClass = 'text-green-500 bg-green-50 dark:bg-green-900/20';
    } else if (percentage >= 0.75) {
      rating = 'جيد جداً';
      colorClass = 'text-blue-500 bg-blue-50 dark:bg-blue-900/20';
    } else if (percentage >= 0.65) {
      rating = 'جيد';
      colorClass = 'text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20';
    } else if (percentage >= 0.60) {
      rating = 'مقبول';
      colorClass = 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
    } else {
      rating = 'راسب'; // Or low
      colorClass = 'text-red-500 bg-red-50 dark:bg-red-900/20';
    }
  }

  return {
    gpa,
    totalPoints,
    totalCredits,
    rating,
    colorClass
  };
};
