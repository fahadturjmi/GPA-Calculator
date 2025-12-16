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
    <div className="group relative isolate flex flex-col gap-4 overflow-hidden rounded-[2rem] bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg dark:bg-surface-dark border border-gray-100 dark:border-white/5 ring-1 ring-black/5 dark:ring-white/5">
      
      {/* Decorative gradient blob background (Subtle) */}
      <div className="absolute -right-10 -top-10 -z-10 size-40 rounded-full bg-primary/5 blur-3xl transition-opacity group-hover:opacity-100 opacity-50"></div>

      {/* Top Row: Icon + Name Input + Delete */}
      <div className="flex items-center gap-3">
        {/* Icon Placeholder */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gray-50 text-gray-400 dark:bg-white/5 dark:text-gray-500 group-focus-within:bg-primary/10 group-focus-within:text-primary transition-colors">
          <span className="material-symbols-outlined text-2xl">menu_book</span>
        </div>

        {/* Course Name Input */}
        <div className="relative flex-1">
          <input
            className="peer w-full border-none bg-transparent p-0 text-lg font-bold text-text-main placeholder-gray-300 focus:ring-0 dark:text-white dark:placeholder-gray-600"
            placeholder="اسم المادة..."
            type="text"
            value={course.name}
            onChange={(e) => onUpdate(course.id, 'name', e.target.value)}
          />
          <span className="absolute -bottom-1 right-0 h-0.5 w-0 bg-primary transition-all duration-300 peer-focus:w-full"></span>
        </div>

        {/* Delete Button */}
        <button
          onClick={() => onRemove(course.id)}
          className="flex size-9 shrink-0 items-center justify-center rounded-full text-gray-300 hover:bg-red-50 hover:text-red-500 transition-colors dark:text-gray-600 dark:hover:bg-red-500/20 dark:hover:text-red-400 no-print"
          title="حذف المادة"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      {/* Divider */}
      <div className="h-px w-full bg-gray-100 dark:bg-white/5"></div>

      {/* Bottom Row: Controls */}
      <div className="grid grid-cols-2 gap-3">
        
        {/* Grade Selector */}
        <div className="relative">
          <div className={`flex h-12 w-full items-center justify-between rounded-xl px-4 transition-all duration-200 border border-transparent ${course.gradeLabel ? 'bg-primary-light/50 text-primary dark:bg-primary/10' : 'bg-gray-50 text-gray-400 dark:bg-white/5'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider absolute -top-2 right-3 bg-white px-1 dark:bg-surface-dark text-gray-400">التقدير</span>
            <span className="font-bold truncate text-sm dir-ltr w-full text-left">
              {course.gradeLabel || 'اختر'}
            </span>
            <span className="material-symbols-outlined text-lg opacity-50 absolute left-3">expand_more</span>
          </div>
          <select
            className="absolute inset-0 size-full cursor-pointer opacity-0"
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

        {/* Credits Selector */}
        <div className="relative">
          <div className="flex h-12 w-full items-center justify-between rounded-xl bg-gray-50 px-4 dark:bg-white/5 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors">
            <span className="text-[10px] font-bold uppercase tracking-wider absolute -top-2 right-3 bg-white px-1 dark:bg-surface-dark text-gray-400">الساعات</span>
            <span className="font-numbers text-lg font-bold text-text-main dark:text-white">
              {course.credits}
            </span>
            <span className="material-symbols-outlined text-lg text-gray-400 absolute left-3">unfold_more</span>
          </div>
          <select
            className="absolute inset-0 size-full cursor-pointer opacity-0"
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