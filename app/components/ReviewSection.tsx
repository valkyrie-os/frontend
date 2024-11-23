'use client';
import { Employee } from '@/Types/types';
import { useState, useEffect } from 'react';

interface ReviewSectionProps {
  selectedEmployee: Employee | null;
  isReviewingAll: boolean;
}

interface ReviewData {
  metrics: {
    commits: number;
    prAcceptance: string;
    reviewTime: string;
  };
  achievements: string[];
  growthAreas: string[];
}

export default function ReviewSection({ selectedEmployee, isReviewingAll }: ReviewSectionProps) {
  const [employeeReviews, setEmployeeReviews] = useState<Record<string, ReviewData>>({});

  const currentReview = selectedEmployee ? employeeReviews[selectedEmployee.id] : null;

  useEffect(() => {
  }, [selectedEmployee, isReviewingAll]);

  const generateReview = () => {
    if (!selectedEmployee) return;

    const newReview: ReviewData = {
      metrics: {
        commits: 247,
        prAcceptance: '94%',
        reviewTime: '0.8 days'
      },
      achievements: [
        'Led the migration to TypeScript across 3 major services',
        'Reduced API response time by 40% through caching implementation',
        'Mentored 2 junior developers in backend development'
      ],
      growthAreas: [
        'Documentation could be more comprehensive',
        'Consider taking on more architectural planning',
        'Opportunity to share knowledge through tech talks'
      ]
    };

    setEmployeeReviews(prev => ({
      ...prev,
      [selectedEmployee.id]: newReview
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Performance Review</h2>
        {(selectedEmployee || isReviewingAll) && (
          <button
            onClick={generateReview}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg
              border border-white/20 hover:border-white transition-all duration-200 ease-in-out
              hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:transform hover:scale-[1.02]"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            {currentReview ? 'Generate Again' : 'Generate Review'}
          </button>
        )}
      </div>

      {!selectedEmployee && !isReviewingAll && (
        <p className="text-zinc-400">Select an employee to start their review</p>
      )}

      {selectedEmployee && !isReviewingAll && (
        <div className="space-y-6">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h3 className="text-white text-lg font-medium mb-4">Employee Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-400">Employee ID</p>
                <p className="text-white">{selectedEmployee.id}</p>
              </div>
              <div>
                <p className="text-zinc-400">Name</p>
                <p className="text-white">{selectedEmployee.name}</p>
              </div>
              <div>
                <p className="text-zinc-400">Position</p>
                <p className="text-white">{selectedEmployee.position}</p>
              </div>
              <div>
                <p className="text-zinc-400">GitHub</p>
                <p className="text-white">@{selectedEmployee.github}</p>
              </div>
              <div>
                <p className="text-zinc-400">Slack</p>
                <p className="text-white">@{selectedEmployee.slack}</p>
              </div>
            </div>
          </div>

          {currentReview && (
            <>
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <p className="text-zinc-400 text-sm">Code Commits</p>
                  <p className="text-2xl font-bold text-white">{currentReview.metrics.commits}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <p className="text-zinc-400 text-sm">PR Acceptance Rate</p>
                  <p className="text-2xl font-bold text-emerald-500">{currentReview.metrics.prAcceptance}</p>
                </div>
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <p className="text-zinc-400 text-sm">Avg Review Time</p>
                  <p className="text-2xl font-bold text-white">{currentReview.metrics.reviewTime}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Key Achievements</h4>
                  <ul className="text-zinc-400 list-disc list-inside space-y-1">
                    {currentReview.achievements.map((achievement: string, index: number) => (
                      <li key={index}>{achievement}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-zinc-800 p-4 rounded-lg">
                  <h4 className="text-white font-medium mb-2">Areas for Growth</h4>
                  <ul className="text-zinc-400 list-disc list-inside space-y-1">
                    {currentReview.growthAreas.map((area: string, index: number) => (
                      <li key={index}>{area}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {currentReview && isReviewingAll && (
        <div className="space-y-4">
          <h3 className="text-white mb-2">Team Performance Overview</h3>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Team Highlights</h4>
            <ul className="text-zinc-400 list-disc list-inside space-y-1">
              <li>Strong collaboration across frontend and backend teams</li>
              <li>Consistent delivery on sprint commitments</li>
              <li>Improved code review processes implemented</li>
            </ul>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2">Focus Areas</h4>
            <ul className="text-zinc-400 list-disc list-inside space-y-1">
              <li>Standardize testing practices across teams</li>
              <li>Enhance cross-team knowledge sharing</li>
              <li>Reduce technical debt in legacy systems</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}