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
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:border-primary/30 hover:shadow-lg dark:border-gray-700 dark:bg-surface-dark">
      
      {/* Decorative Side Strip */}
      <div className="absolute right-0 top-0 h-full w-1.5 bg-gray-100 transition-colors duration-300 group-hover:bg-primary dark:bg-gray-800"></div>

      <div className="flex flex-col gap-4 p-5 pr-6"> {/* Added padding-right to account for strip */}
        
        {/* Top Section: Name Input & Delete Button */}
        <div className="flex items-start gap-4">
          <div className="relative flex-1">
            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span className="material-symbols-outlined text-[14px]">edit_note</span>
              اسم المادة
            </label>
            <div className="relative overflow-hidden rounded-xl bg-gray-50 transition-colors focus-within:bg-blue-50/50 focus-within:ring-1 focus-within:ring-blue-200 dark:bg-black/20 dark:focus-within:bg-white/5 dark:focus-within:ring-white/10">
              <input
                className="w-full bg-transparent px-4 py-3 text-base font-bold text-text-main placeholder-gray-300 focus:outline-none dark:text-white dark:placeholder-gray-600"
                placeholder="مثال: رياضيات 101"
                type="text"
                value={course.name}
                onChange={(e) => onUpdate(course.id, 'name', e.target.value)}
              />
            </div>
          </div>

          <button
            onClick={() => onRemove(course.id)}
            className="mt-6 flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-400 transition-colors hover:bg-red-500 hover:text-white dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500 dark:hover:text-white no-print"
            title="حذف المادة"
          >
            <span className="material-symbols-outlined text-[20px]">delete</span>
          </button>
        </div>

        {/* Bottom Section: Inputs Grid */}
        <div className="grid grid-cols-5 gap-3">
          
          {/* Grade Selector (Takes 3 columns) */}
          <div className="col-span-3">
            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              التقدير
            </label>
            <div className="relative h-12 rounded-xl bg-gray-50 transition-all focus-within:bg-primary-light/20 focus-within:ring-1 focus-within:ring-primary/30 hover:bg-gray-100 dark:bg-black/20 dark:hover:bg-black/30 dark:focus-within:bg-primary/10">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
                <span className={`font-bold ${course.gradeLabel ? 'text-text-main dark:text-white' : 'text-gray-400'}`}>
                   {course.gradeLabel ? (
                      <span className="dir-ltr inline-block">{course.gradeLabel}</span>
                   ) : (
                      'اختر'
                   )}
                </span>
                <span className="material-symbols-outlined text-gray-400">expand_more</span>
              </div>
              <select
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                value={course.gradeLabel}
                onChange={(e) => onUpdate(course.id, 'gradeLabel', e.target.value)}
              >
                <option disabled value="">اختر الدرجة</option>
                {GRADE_OPTIONS.map((opt) => (
                  <option key={opt.label} value={opt.label}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Credits Selector (Takes 2 columns) */}
          <div className="col-span-2">
            <label className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-gray-400">
              <span className="material-symbols-outlined text-[14px]">schedule</span>
              الساعات
            </label>
            <div className="relative h-12 rounded-xl bg-gray-50 transition-all focus-within:bg-primary-light/20 focus-within:ring-1 focus-within:ring-primary/30 hover:bg-gray-100 dark:bg-black/20 dark:hover:bg-black/30 dark:focus-within:bg-primary/10">
              <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-3">
                <span className="font-numbers text-lg font-bold text-text-main dark:text-white">
                  {course.credits}
                </span>
                <span className="material-symbols-outlined text-gray-400">unfold_more</span>
              </div>
              <select
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
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
      </div>
    </div>
  );
};