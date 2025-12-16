import React from 'react';
import { Course } from '../types';
import { GRADE_OPTIONS, HOURS_OPTIONS } from '../constants';

interface CourseItemProps {
  course: Course;
  onUpdate: (id: string, field: keyof Course, value: any) => void;
  onRemove: (id: string) => void;
}

export const CourseItem: React.FC<CourseItemProps> = ({ course, onUpdate, onRemove }) => {
  return (
    <div className="group relative flex flex-col gap-4 rounded-3xl bg-white dark:bg-surface-dark p-5 shadow-soft border border-gray-100 dark:border-gray-800 transition-all hover:border-gray-200 dark:hover:border-gray-700">
      {/* Top Row: Name and Close */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1">
          <label className="text-[11px] font-medium text-text-secondary dark:text-gray-500 mb-1 block">
            اسم المادة
          </label>
          <input
            className="w-full bg-transparent p-0 text-lg font-bold text-text-main dark:text-white placeholder-gray-300 dark:placeholder-gray-600 focus:outline-none focus:ring-0 border-none"
            placeholder="اكتب اسم المادة..."
            type="text"
            value={course.name}
            onChange={(e) => onUpdate(course.id, 'name', e.target.value)}
          />
        </div>
        <button
          onClick={() => onRemove(course.id)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors no-print"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Bottom Row: Grade and Hours */}
      <div className="flex items-center gap-3">
        {/* Grade Selector */}
        <div className="relative flex-1 rounded-2xl bg-gray-50 dark:bg-black/20 px-4 py-3 transition-colors group-focus-within:bg-primary-light/30 dark:group-focus-within:bg-primary/5">
          <label className="block text-[10px] font-bold text-text-secondary/70 mb-0.5">
            الدرجة
          </label>
          <div className="flex items-center justify-between">
            <span className={`font-bold text-lg ${course.gradeLabel ? 'text-text-main dark:text-white' : 'text-gray-300'}`}>
              {course.gradeLabel || 'اختر'}
            </span>
            <span className="material-symbols-outlined text-sm text-gray-400">expand_more</span>
          </div>
          <select
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            value={course.gradeLabel}
            onChange={(e) => onUpdate(course.id, 'gradeLabel', e.target.value)}
          >
            <option disabled value="">اختر</option>
            {GRADE_OPTIONS.map((opt) => (
              <option key={opt.label} value={opt.label}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Hours Selector */}
        <div className="relative w-28 rounded-2xl bg-gray-50 dark:bg-black/20 px-4 py-3 transition-colors group-focus-within:bg-primary-light/30 dark:group-focus-within:bg-primary/5">
          <label className="block text-[10px] font-bold text-text-secondary/70 mb-0.5">
            الساعات
          </label>
          <div className="flex items-center justify-between">
            <span className="font-bold text-lg text-text-main dark:text-white">
              {course.credits}
            </span>
            <span className="material-symbols-outlined text-sm text-gray-400">expand_more</span>
          </div>
          <select
            className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
            value={course.credits}
            onChange={(e) => onUpdate(course.id, 'credits', Number(e.target.value))}
          >
            {HOURS_OPTIONS.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
