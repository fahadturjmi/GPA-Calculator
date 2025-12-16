import React from 'react';
import { GPACalculationResult, GradeScale } from '../types';

interface GPACardProps {
  result: GPACalculationResult;
  scale: GradeScale;
  setScale: (s: GradeScale) => void;
}

export const GPACard: React.FC<GPACardProps> = ({ result, scale, setScale }) => {
  return (
    <>
      <div className="relative w-full overflow-hidden rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-8 text-center shadow-soft">
        <div className="relative flex flex-col items-center justify-center gap-3">
          <p className="text-sm font-medium text-text-secondary dark:text-gray-400">
            المعدل التراكمي الحالي
          </p>
          <div className="flex items-baseline justify-center w-full">
            <h1 className="font-numbers text-8xl font-bold tracking-tight text-blue-700 dark:text-blue-400">
              {result.gpa.toFixed(2)}
            </h1>
          </div>
          <div className={`mt-2 inline-flex items-center rounded-full px-4 py-1.5 ${result.colorClass.startsWith('text-gray') ? 'bg-gray-100 dark:bg-gray-800' : result.colorClass.replace('text-', 'bg-').split(' ')[1] || 'bg-primary-light'}`}>
            <span className={`text-sm font-semibold ${result.colorClass.split(' ')[0]}`}>
              {result.rating}
            </span>
          </div>
        </div>
      </div>

      <div className="flex justify-center no-print">
        <div className="flex h-14 w-full max-w-xs items-center justify-center rounded-full bg-white dark:bg-surface-dark p-1.5 shadow-soft border border-gray-100 dark:border-gray-700">
          <label className="group relative flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-full px-2">
            <input
              className="peer invisible absolute w-0"
              name="gpa-scale"
              type="radio"
              value="4.0"
              checked={scale === '4.0'}
              onChange={() => setScale('4.0')}
            />
            <span className="relative z-10 text-sm font-semibold text-gray-400 transition-colors peer-checked:text-primary">
              من 4.0
            </span>
            <div className="absolute inset-0 z-0 bg-primary-light dark:bg-primary/10 opacity-0 transition-all duration-300 peer-checked:opacity-100 rounded-full"></div>
          </label>
          <label className="group relative flex cursor-pointer h-full flex-1 items-center justify-center overflow-hidden rounded-full px-2">
            <input
              className="peer invisible absolute w-0"
              name="gpa-scale"
              type="radio"
              value="5.0"
              checked={scale === '5.0'}
              onChange={() => setScale('5.0')}
            />
            <span className="relative z-10 text-sm font-semibold text-gray-400 transition-colors peer-checked:text-primary">
              من 5.0
            </span>
            <div className="absolute inset-0 z-0 bg-primary-light dark:bg-primary/10 opacity-0 transition-all duration-300 peer-checked:opacity-100 rounded-full"></div>
          </label>
        </div>
      </div>
    </>
  );
};