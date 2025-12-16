import React, { useState, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Course, GradeScale } from './types';
import { INITIAL_COURSES } from './constants';
import { calculateGPA } from './services/gpaCalculator';
import { GPACard } from './components/GPACard';
import { CourseItem } from './components/CourseItem';
import { ReportView } from './components/ReportView';

// Simple ID generator if uuid isn't available
const generateId = () => Math.random().toString(36).substr(2, 9);

const App: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>(INITIAL_COURSES);
  const [scale, setScale] = useState<GradeScale>('5.0');
  const [darkMode, setDarkMode] = useState(false);
  const [showReport, setShowReport] = useState(false);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const gpaResult = useMemo(() => calculateGPA(courses, scale), [courses, scale]);

  const addCourse = () => {
    const newCourse: Course = {
      id: generateId(),
      name: '',
      gradeLabel: '',
      credits: 3,
    };
    setCourses([...courses, newCourse]);
    // Scroll to bottom after render
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  const updateCourse = (id: string, field: keyof Course, value: any) => {
    setCourses(prev =>
      prev.map(c => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const removeCourse = (id: string) => {
    setCourses(prev => prev.filter(c => c.id !== id));
  };

  const clearAll = () => {
    if (window.confirm('هل أنت متأكد من مسح جميع المواد؟')) {
      setCourses([]);
    }
  };

  return (
    <>
      {showReport ? (
        <ReportView 
          courses={courses} 
          result={gpaResult} 
          scale={scale} 
          onClose={() => setShowReport(false)} 
        />
      ) : (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden pb-24 transition-colors duration-300">
          {/* Header */}
          <header className="flex items-center px-6 py-6 justify-between sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md no-print border-b border-transparent dark:border-white/5">
            <button
              onClick={toggleDarkMode}
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 transition-colors cursor-pointer text-gray-500 dark:text-gray-300"
            >
              <span className="material-symbols-outlined text-[20px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-main dark:text-white">
              حساب المعدل التراكمي
            </h2>
            <button
              onClick={() => setShowReport(true)}
              title="عرض التقرير"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 transition-colors cursor-pointer text-primary dark:text-primary"
            >
              <span className="material-symbols-outlined text-[20px]">analytics</span>
            </button>
          </header>

          {/* Main Content */}
          <main className="flex flex-col gap-8 px-5 pt-2">
            
            {/* GPA Display & Scale Toggle */}
            <GPACard result={gpaResult} scale={scale} setScale={setScale} />

            {/* Course List */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xl font-bold text-text-main dark:text-white">
                  المواد الدراسية
                </h3>
                {courses.length > 0 && (
                    <button
                    onClick={clearAll}
                    className="text-sm font-medium text-text-secondary hover:text-primary transition-colors no-print"
                    >
                    مسح الكل
                    </button>
                )}
              </div>

              <div className="flex flex-col gap-4">
                {courses.map(course => (
                  <CourseItem
                    key={course.id}
                    course={course}
                    onUpdate={updateCourse}
                    onRemove={removeCourse}
                  />
                ))}
                
                {courses.length === 0 && (
                    <div className="text-center py-10 text-gray-400 border-2 border-dashed border-gray-200 dark:border-gray-800 rounded-3xl">
                        لا يوجد مواد مضافة حالياً
                    </div>
                )}
              </div>
            </div>
            
            <div className="h-24"></div>
          </main>

          {/* FAB (Floating Action Button) */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 no-print">
            <button
              onClick={addCourse}
              className="group flex h-14 items-center gap-2.5 rounded-full bg-primary pl-6 pr-8 shadow-glow transition-transform active:scale-95 hover:brightness-110"
            >
              <span className="material-symbols-outlined text-white text-[28px]">
                add
              </span>
              <span className="font-bold text-white text-lg">إضافة مادة</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
