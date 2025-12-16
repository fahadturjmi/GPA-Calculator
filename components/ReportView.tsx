import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Course, GPACalculationResult, GradeScale } from '../types';
import { GRADE_OPTIONS } from '../constants';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ReportViewProps {
  courses: Course[];
  result: GPACalculationResult;
  scale: GradeScale;
  onClose: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ courses, result, scale, onClose }) => {
  
  // Prepare Chart Data
  const chartData = {
    labels: courses.map(c => c.name || 'مادة بدون اسم'),
    datasets: [
      {
        label: 'النقاط',
        data: courses.map(c => {
            const gradeInfo = GRADE_OPTIONS.find(g => g.label === c.gradeLabel);
            return scale === '4.0' ? gradeInfo?.value4 || 0 : gradeInfo?.value5 || 0;
        }),
        backgroundColor: '#FF3D55', // Primary Color
        borderColor: '#FF3D55',
        borderWidth: 0,
        borderRadius: 4,
        barThickness: 15,
      },
    ],
  };

  const chartFont = {
      family: "'Manrope', 'IBM Plex Sans Arabic', sans-serif"
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: scale === '4.0' ? 4 : 5,
        grid: {
            color: 'rgba(100, 100, 100, 0.1)',
            borderDash: [5, 5]
        },
        ticks: {
            font: chartFont,
            color: '#9CA3AF'
        },
        border: { display: false }
      },
      x: {
        grid: { display: false },
        ticks: {
            font: chartFont,
            color: '#6B7280',
            autoSkip: true,
            maxRotation: 45,
            minRotation: 0
        },
        border: { display: false }
      }
    },
    plugins: {
        legend: { display: false },
        tooltip: {
            backgroundColor: '#1A1A2E',
            titleFont: chartFont,
            bodyFont: chartFont,
            padding: 12,
            cornerRadius: 12,
            displayColors: false
        }
    }
  };

  const handlePrint = () => {
    setTimeout(() => {
        window.print();
    }, 100);
  };

  return (
    <div id="report-view-container" className="min-h-screen w-full bg-background-light dark:bg-background-dark transition-colors duration-300 pb-24 animate-fade-in-up">
      
      {/* Screen Header - Hidden in Print */}
      <header className="flex items-center px-6 py-6 justify-between sticky top-0 z-20 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md no-print border-b border-transparent dark:border-white/5">
        <button
            onClick={onClose}
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-surface-dark hover:bg-gray-50 transition-colors cursor-pointer text-gray-500 dark:text-gray-300"
        >
            <span className="material-symbols-outlined text-[20px] rotate-180">arrow_forward</span>
        </button>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center text-text-main dark:text-white">
            تقرير الأداء
        </h2>
        <div className="size-10"></div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-6 px-5 pt-2 print:p-8 print:flex print:flex-col print:h-screen print:overflow-hidden">
        
        {/* Printable Header - Professional Look */}
        <div className="hidden print:flex items-center justify-between mb-8 border-b-2 border-primary/20 pb-6">
            <div>
                <h1 className="text-3xl font-bold mb-1 text-black">تقرير المعدل التراكمي</h1>
                <p className="text-sm text-gray-500">تم الإنشاء بواسطة: تطبيق حساب المعدل</p>
            </div>
            <div className="text-left">
                <p className="text-sm font-bold text-gray-800">التاريخ: <span className="font-normal font-numbers">{new Date().toLocaleDateString('en-GB')}</span></p>
                <p className="text-sm font-bold text-gray-800">نظام المعدل: <span className="font-normal font-numbers">من {scale}</span></p>
            </div>
        </div>

        {/* Print Layout Grid: Top Section (Summary + Chart) */}
        <div className="flex flex-col gap-6 print:grid print:grid-cols-2 print:gap-8 print:mb-8">
            
            {/* 1. Summary Card */}
            <div className="relative w-full overflow-hidden rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-8 text-center shadow-soft print:shadow-none print:border print:border-gray-200 print:rounded-2xl print:p-6 print:flex print:flex-col print:justify-center">
                <div className="grid grid-cols-2 gap-6 items-center h-full">
                    <div className="flex flex-col items-center justify-center border-l border-gray-100 dark:border-gray-700 pl-6 print:border-gray-200">
                        <p className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wider mb-2">المعدل التراكمي</p>
                        <p className="font-numbers text-5xl font-bold text-primary dark:text-primary">{result.gpa.toFixed(2)}</p>
                        <div className={`mt-2 inline-flex items-center rounded-full px-3 py-1 ${result.colorClass.startsWith('text-gray') ? 'bg-gray-100 dark:bg-gray-800' : result.colorClass.replace('text-', 'bg-').split(' ')[1] || 'bg-primary-light'} print:bg-gray-100 print:text-black`}>
                            <span className={`text-xs font-bold ${result.colorClass.split(' ')[0]} print:text-black`}>{result.rating}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <div>
                            <p className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wider mb-1">عدد الساعات</p>
                            <p className="font-numbers text-2xl font-bold text-text-main dark:text-white">{result.totalCredits}</p>
                        </div>
                        <div>
                             <p className="text-xs font-bold text-text-secondary dark:text-gray-400 uppercase tracking-wider mb-1">النقاط</p>
                             <p className="font-numbers text-2xl font-bold text-text-main dark:text-white">{result.totalPoints.toFixed(1)}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Chart Card */}
            <div className="rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 shadow-soft print:shadow-none print:border print:border-gray-200 print:rounded-2xl print:h-full">
                <div className="flex items-center gap-3 mb-4 print:mb-2">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary print:hidden">
                        <span className="material-symbols-outlined text-lg">bar_chart</span>
                    </div>
                    <h3 className="text-lg font-bold text-text-main dark:text-white">الأداء البياني</h3>
                </div>
                <div className="h-64 w-full print:h-48">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </div>
        </div>

        {/* 3. Details Table Card */}
        <div className="rounded-3xl bg-white dark:bg-surface-dark border border-gray-100 dark:border-gray-800 p-6 shadow-soft print:shadow-none print:border print:border-gray-200 print:rounded-2xl print:flex-1">
             <div className="flex items-center gap-3 mb-6 print:mb-4">
                <div className="size-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 print:hidden">
                    <span className="material-symbols-outlined text-lg">list_alt</span>
                </div>
                <h3 className="text-lg font-bold text-text-main dark:text-white">تفاصيل المواد</h3>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-gray-100 dark:border-gray-700 print:border-0">
                <table className="w-full min-w-full divide-y divide-gray-100 dark:divide-gray-700 print:divide-gray-200">
                    <thead className="bg-gray-50 dark:bg-black/20 print:bg-gray-100">
                        <tr>
                            <th scope="col" className="px-4 py-3 text-right text-[11px] font-bold text-gray-500 uppercase tracking-wider print:text-black">المادة</th>
                            <th scope="col" className="px-4 py-3 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider print:text-black">الساعات</th>
                            <th scope="col" className="px-4 py-3 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider print:text-black">التقدير</th>
                            <th scope="col" className="px-4 py-3 text-center text-[11px] font-bold text-gray-500 uppercase tracking-wider print:text-black print:block hidden">النقاط</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-surface-dark divide-y divide-gray-100 dark:divide-gray-700 print:divide-gray-200">
                        {courses.map((course) => {
                             const gradeInfo = GRADE_OPTIONS.find(g => g.label === course.gradeLabel);
                             const points = scale === '4.0' ? gradeInfo?.value4 : gradeInfo?.value5;
                             
                             return (
                            <tr key={course.id} className="print:text-sm">
                                <td className="px-4 py-3 text-sm font-bold text-text-main dark:text-white print:py-2">{course.name || '-'}</td>
                                <td className="font-numbers px-4 py-3 text-center text-sm text-text-secondary dark:text-gray-400 font-medium print:py-2">{course.credits}</td>
                                <td className="px-4 py-3 text-center text-sm font-bold text-text-main dark:text-white dir-ltr print:py-2">
                                    <span className="inline-block bg-gray-50 dark:bg-gray-800 rounded px-2 py-1 text-xs print:bg-transparent print:border print:border-gray-200">
                                        {course.gradeLabel}
                                    </span>
                                </td>
                                <td className="font-numbers px-4 py-3 text-center text-sm text-gray-600 font-medium print:py-2 print:block hidden">
                                    {points}
                                </td>
                            </tr>
                        )})}
                    </tbody>
                </table>
            </div>
        </div>

        {/* Printable Footer */}
        <div className="hidden print:block mt-auto pt-4 border-t border-gray-200 text-center">
             <p className="text-sm font-bold text-gray-600">
                جميع الحقوق محفوظة - تطوير : فهد الترجمي ، 2026
             </p>
        </div>

      </main>

      {/* FAB - Print Button */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 no-print w-full flex justify-center pointer-events-none">
        <button
            onClick={handlePrint}
            className="pointer-events-auto group flex h-14 items-center gap-2.5 rounded-full bg-text-main dark:bg-white pl-6 pr-8 shadow-glow transition-transform active:scale-95 hover:scale-105"
        >
            <span className="material-symbols-outlined text-white dark:text-text-main text-[24px]">
            print
            </span>
            <span className="font-bold text-white dark:text-text-main text-lg">طباعة التقرير</span>
        </button>
      </div>

    </div>
  );
};