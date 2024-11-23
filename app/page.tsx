// page.tsx
'use client'
import EmployeeList from "@/app/components/EmployeeList";
import ReviewSection from "./components/ReviewSection";
import MetricsSection from "./components/MetricsSection";
import { useState } from "react";
import { Employee } from "@/Types/types";

export default function Home() {
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isReviewingAll, setIsReviewingAll] = useState(false);
  const [pdfContent, setPdfContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsReviewingAll(false);
  };

  const handleReviewAll = () => {
    setSelectedEmployee(null);
    setIsReviewingAll(true);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/pdf-parse', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to parse PDF');
      }
      
      const { text } = await response.json();
      setPdfContent(text);
    } catch (error) {
      console.error('Error parsing PDF:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <nav className="bg-black border-b border-zinc-800 p-6">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Performance Evaluation Assistant</h1>
          <div className="flex gap-4">
            <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg
              border border-white/20 hover:border-white transition-all duration-200 ease-in-out
              hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:transform hover:scale-[1.02]">Settings</button>
            <button className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg
              border border-white/20 hover:border-white transition-all duration-200 ease-in-out
              hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:transform hover:scale-[1.02]">History</button>
          </div>
        </div>
      </nav>
      <div className="container mx-auto p-8">
        <div className="mb-8 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white mb-4">Upload Performance Data</h2>
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="pdf-upload"
              />
              <label
                htmlFor="pdf-upload"
                className={`
                  cursor-pointer inline-flex items-center gap-2 
                  ${isLoading ? 'bg-zinc-800' : 'bg-black'} 
                  text-white px-6 py-3 rounded-lg
                  border border-white/20 hover:border-white
                  transition-all duration-200 ease-in-out
                  hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]
                  ${isLoading ? 'opacity-75' : 'hover:transform hover:scale-[1.02]'}
                `}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                    </svg>
                    <span>Upload PDF</span>
                  </>
                )}
              </label>
            </div>
          </div>      
          {pdfContent && (
            <div className="mt-4 p-4 bg-zinc-800 rounded-lg">
              <p className="text-zinc-400 text-sm">
                PDF content loaded ({pdfContent.length} characters)
              </p>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <EmployeeList 
              onSelectEmployee={handleSelectEmployee}
              onReviewAll={handleReviewAll}
            />
          </div>
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <ReviewSection 
              selectedEmployee={selectedEmployee}
              isReviewingAll={isReviewingAll}
            />
          </div>
        </div>
        <div className="mt-8 bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <MetricsSection />
        </div>
      </div>
    </div>
  );
}
