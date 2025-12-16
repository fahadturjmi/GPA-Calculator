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

// Explicitly register the components we need to avoid "scale not registered" errors
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
        backgroundColor: 'rgba(29, 78, 216, 0.6)', // Blue-700 with opacity
        borderColor: 'rgba(29, 78, 216, 1)', // Blue-700
        borderWidth: 1,
        borderRadius: 4,
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
            color: 'rgba(0, 0, 0, 0.05)'
        },
        ticks: {
            font: chartFont,
            color: '#1d4ed8' // Blue-700
        }
      },
      x: {
        grid: { display: false },
        ticks: {
            font: chartFont
        }
      }
    },
    plugins: {
        legend: { display: false },
        title: {
            display: true,
            text: 'تحليل أداء المواد',
            font: { ...chartFont, size: 14 }
        },
        tooltip: {
            titleFont: chartFont,
            bodyFont: chartFont
        }
    }
  };

  const handlePrint = () => {
    // Timeout ensures UI updates (like hover states removing) happen before print dialog
    setTimeout(() => {
        window.print();
    }, 100);
  };

  return (
    <div id="report-view-container" className="fixed inset-0 z-50 overflow-y-auto bg-white dark:bg-background-dark sm:p-6 print:absolute print:inset-0 print:overflow-visible">
      {/* Print / Close Actions Toolbar (Hidden on Print) */}
      <div className="no-print sticky top-0 z-10 mb-6 flex items-center justify-between rounded-2xl bg-gray-900 p-4 text-white shadow-lg mx-auto max-w-4xl">
        <button 
            onClick={onClose}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 hover:bg-white/20 transition-colors"
        >
             <span className="material-symbols-outlined">arrow_forward</span>
             <span>رجوع</span>
        </button>
        <span className="font-bold">معاينة التقرير</span>
        <button 
            onClick={handlePrint}
            className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2 font-bold hover:bg-red-600 transition-colors"
        >
             <span>حفظ كـ PDF</span>
             <span className="material-symbols-outlined">print</span>
        </button>
      </div>

      {/* The Report Paper */}
      <div className="mx-auto min-h-[297mm] w-full max-w-[210mm] bg-white p-8 text-black shadow-none sm:shadow-xl dark:bg-white sm:rounded-xl print:w-full print:max-w-none print:shadow-none print:p-0 print:m-0">
        
        {/* Report Header */}
        <div className="mb-8 border-b-2 border-primary pb-6">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900">تقرير المعدل التراكمي</h1>
                    <p className="mt-2 text-sm text-gray-500">تم الاستخراج بتاريخ: {new Date().toLocaleDateString('ar-EG')}</p>
                </div>
                <div className="text-left">
                     <p className="font-bold text-gray-900">نظام المعدل</p>
                     <p className="font-numbers text-blue-700 text-xl font-bold dir-ltr">/ {scale}</p>
                </div>
            </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-10 grid grid-cols-3 gap-6">
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-100 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">المعدل التراكمي</p>
                <p className="font-numbers text-4xl font-extrabold text-blue-700">{result.gpa.toFixed(2)}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-100 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">التقدير العام</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{result.rating}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-6 border border-gray-100 text-center">
                <p className="text-sm font-medium text-gray-500 mb-2">إجمالي الساعات</p>
                <p className="font-numbers text-2xl font-bold text-blue-700 mt-1">{result.totalCredits}</p>
            </div>
        </div>

        {/* Chart Section */}
        <div className="mb-10 h-64 w-full rounded-xl border border-gray-100 p-4">
             <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Detailed Table */}
        <div className="mb-8">
            <h3 className="mb-4 text-lg font-bold text-gray-800 border-r-4 border-primary pr-3">تفاصيل المواد</h3>
            <table className="w-full min-w-full divide-y divide-gray-200 border border-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">المادة</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الساعات</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">الدرجة</th>
                        <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-500 uppercase tracking-wider">النقاط</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {courses.map((course) => {
                         const gradeInfo = GRADE_OPTIONS.find(g => g.label === course.gradeLabel);
                         const points = scale === '4.0' ? gradeInfo?.value4 : gradeInfo?.value5;
                         return (
                            <tr key={course.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.name || '-'}</td>
                                <td className="font-numbers px-6 py-4 whitespace-nowrap text-center text-sm text-blue-700 font-medium">{course.credits}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-bold text-gray-900 dir-ltr">{course.gradeLabel}</td>
                                <td className="font-numbers px-6 py-4 whitespace-nowrap text-center text-sm text-blue-700 font-medium">{points}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t pt-6 text-center text-xs text-gray-400">
            <p>تم إنشاء هذا التقرير بواسطة تطبيق حساب المعدل التراكمي</p>
            <p className="mt-1 font-mono text-[10px]">GPA Calculator Pro &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
};