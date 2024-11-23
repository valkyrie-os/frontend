'use client';
import { Employee } from '@/Types/types';
import { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

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
  levels: {
    'Scope and Impact': 'L3' | 'L4' | 'L5' | 'L6';
    'Technical Contributions': 'L3' | 'L4' | 'L5' | 'L6';
    'Expertise': 'L3' | 'L4' | 'L5' | 'L6';
    'Design & Architecture': 'L3' | 'L4' | 'L5' | 'L6';
    'Ownership': 'L3' | 'L4' | 'L5' | 'L6';
  };
}

interface LevelCriteria {
  L3: string;
  L4: string;
  L5: string;
  L6: string;
}

interface PerformanceCriteria {
  'Scope and Impact': LevelCriteria;
  'Technical Contributions': LevelCriteria;
  'Expertise': LevelCriteria;
  'Design & Architecture': LevelCriteria;
  'Ownership': LevelCriteria;
}

interface PDFPreviewProps {
  employee: Employee;
  review: ReviewData;
  performanceLevels: PerformanceCriteria;
  onClose: () => void;
}

// Create a new interface without onClose for the PDF document
interface PDFDocumentProps {
  employee: Employee;
  review: ReviewData;
  performanceLevels: PerformanceCriteria;
}

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica'
  },
  header: {
    marginBottom: 20,
    borderBottom: '1 solid #333',
    paddingBottom: 10
  },
  title: {
    fontSize: 24,
    marginBottom: 10
  },
  section: {
    marginBottom: 20
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
    fontWeight: 'bold'
  },
  grid: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  gridItem: {
    width: '50%',
    marginBottom: 10
  },
  label: {
    color: '#666',
    fontSize: 10,
    marginBottom: 2
  },
  value: {
    fontSize: 12
  },
  bullet: {
    marginBottom: 5
  },
  metricsGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  metricBox: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
    width: '30%'
  },
  assessmentRow: {
    marginBottom: 10
  },
  categoryLabel: {
    fontSize: 12,
    marginBottom: 5
  },
  levelGrid: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10
  },
  levelCell: {
    flex: 1,
    padding: 5
  },
  levelText: {
    fontSize: 10
  },
  selectedLevel: {
    backgroundColor: '#e5e7eb'
  },
  selectedLevelText: {
    fontWeight: 'bold'
  }
});

const generatePDF = (employee: Employee, review: ReviewData) => {
  const doc = new jsPDF();
  const margin = 20;
  let yPos = margin;
  
  // Title
  doc.setFontSize(20);
  doc.text('Performance Review Report', margin, yPos);
  yPos += 15;

  // Employee Details
  doc.setFontSize(14);
  doc.text('Employee Details', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  doc.text(`Name: ${employee.name}`, margin, yPos);
  yPos += 7;
  doc.text(`Position: ${employee.position} (${employee.level})`, margin, yPos);
  yPos += 7;
  doc.text(`GitHub: @${employee.github}`, margin, yPos);
  yPos += 7;
  doc.text(`Slack: @${employee.slack}`, margin, yPos);
  yPos += 15;

  // Metrics
  doc.setFontSize(14);
  doc.text('Performance Metrics', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  doc.text(`Code Commits: ${review.metrics.commits}`, margin, yPos);
  yPos += 7;
  doc.text(`PR Acceptance Rate: ${review.metrics.prAcceptance}`, margin, yPos);
  yPos += 7;
  doc.text(`Average Review Time: ${review.metrics.reviewTime}`, margin, yPos);
  yPos += 15;

  // Achievements
  doc.setFontSize(14);
  doc.text('Key Achievements', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  review.achievements.forEach(achievement => {
    doc.text(`• ${achievement}`, margin, yPos);
    yPos += 7;
  });
  yPos += 8;

  // Growth Areas
  doc.setFontSize(14);
  doc.text('Areas for Growth', margin, yPos);
  yPos += 10;
  doc.setFontSize(12);
  review.growthAreas.forEach(area => {
    doc.text(`• ${area}`, margin, yPos);
    yPos += 7;
  });

  // Save the PDF
  doc.save(`${employee.name.replace(' ', '_')}_performance_review.pdf`);
};

const PDFPreview: React.FC<PDFPreviewProps> = ({ employee, review, performanceLevels, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-8">
      <div className="bg-white rounded-lg w-full h-full flex flex-col">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black">Performance Review Preview</h3>
          <div className="flex gap-4">
            <button
              onClick={() => {
                generatePDF(employee, review);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Download PDF
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Close
            </button>
          </div>
        </div>
        <div className="flex-1 p-4">
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <PerformanceReviewDocument 
              employee={employee} 
              review={review} 
              performanceLevels={performanceLevels}
            />
          </PDFViewer>
        </div>
      </div>
    </div>
  );
};

const PerformanceReviewDocument = ({ employee, review, performanceLevels }: PDFDocumentProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Performance Review Report</Text>
        <Text style={styles.value}>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Employee Details</Text>
        <View style={styles.grid}>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{employee.name}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.label}>Position</Text>
            <Text style={styles.value}>{employee.position} ({employee.level})</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Metrics</Text>
        <View style={styles.metricsGrid}>
          <View style={styles.metricBox}>
            <Text style={styles.label}>Code Commits</Text>
            <Text style={styles.value}>{review.metrics.commits}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.label}>PR Acceptance Rate</Text>
            <Text style={styles.value}>{review.metrics.prAcceptance}</Text>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.label}>Avg Review Time</Text>
            <Text style={styles.value}>{review.metrics.reviewTime}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Level Assessment</Text>
        {Object.entries(performanceLevels).map(([category, levels]) => (
          <View key={category} style={styles.assessmentRow}>
            <Text style={styles.categoryLabel}>{category}</Text>
            <View style={styles.levelGrid}>
              {['L3', 'L4', 'L5', 'L6'].map((level) => (
                <View key={level} style={[
                  styles.levelCell,
                  review.levels[category as keyof typeof review.levels] === level ? styles.selectedLevel : {}
                ]}>
                  <Text style={[
                    styles.levelText,
                    review.levels[category as keyof typeof review.levels] === level ? styles.selectedLevelText : {}
                  ]}>
                    {levels[level as keyof LevelCriteria]}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Achievements</Text>
        {review.achievements.map((achievement, index) => (
          <Text key={index} style={styles.bullet}>• {achievement}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Areas for Growth</Text>
        {review.growthAreas.map((area, index) => (
          <Text key={index} style={styles.bullet}>• {area}</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export default function ReviewSection({ selectedEmployee, isReviewingAll }: ReviewSectionProps) {
  const [employeeReviews, setEmployeeReviews] = useState<Record<string, ReviewData>>({});
  const [showPDFPreview, setShowPDFPreview] = useState<boolean>(false);

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
      ],
      levels: {
        'Scope and Impact': 'L4',
        'Technical Contributions': 'L5',
        'Expertise': 'L4',
        'Design & Architecture': 'L4',
        'Ownership': 'L3'
      }
    };

    setEmployeeReviews(prev => ({
      ...prev,
      [selectedEmployee.id]: newReview
    }));
  };

  const performanceLevels: PerformanceCriteria = {
    'Scope and Impact': {
      L3: 'Team scope, well-defined problems',
      L4: 'Team/component scope, complex problems',
      L5: 'Multiple teams, org-wide impact',
      L6: 'Company-wide, strategic impact'
    },
    'Technical Contributions': {
      L3: 'Implements features independently',
      L4: 'Drives medium projects',
      L5: 'Leads large technical initiatives',
      L6: 'Sets technical direction'
    },
    'Expertise': {
      L3: 'Growing domain knowledge',
      L4: 'Deep domain expertise',
      L5: 'Broad technical expertise',
      L6: 'Industry-recognized expert'
    },
    'Design & Architecture': {
      L3: 'Contributes to design',
      L4: 'Designs components',
      L5: 'Architects systems',
      L6: 'Sets architectural vision'
    },
    'Ownership': {
      L3: 'Owns features',
      L4: 'Owns components',
      L5: 'Owns critical systems',
      L6: 'Owns technical strategy'
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Performance Review</h2>
        <div className="flex gap-4">
          {(selectedEmployee || isReviewingAll) && (
            <button
              onClick={generateReview}
              className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg
                border border-white/20 hover:border-white transition-all duration-200 ease-in-out
                hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:transform hover:scale-[1.02]"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {currentReview ? 'Generate Again' : 'Generate Review'}
            </button>
          )}
          {currentReview && (
            <button
              onClick={() => setShowPDFPreview(true)}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg
                hover:bg-emerald-500 transition-all duration-200 ease-in-out
                hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:transform hover:scale-[1.02]"
            >
              Preview PDF
            </button>
          )}
        </div>
      </div>
      {showPDFPreview && selectedEmployee && currentReview && (
        <PDFPreview
          employee={selectedEmployee}
          review={currentReview}
          performanceLevels={performanceLevels}
          onClose={() => setShowPDFPreview(false)}
        />
      )}
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
                <p className="text-white">
                  {selectedEmployee.position}
                  <span className="ml-2 px-2 py-0.5 bg-zinc-700 rounded text-sm">
                    {selectedEmployee.level}
                  </span>
                </p>
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

              <div className="bg-zinc-800 p-4 rounded-lg mt-4">
                <h4 className="text-white font-medium mb-4">Level Assessment Grid</h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-zinc-400 p-2"></th>
                        <th className="text-left text-zinc-400 p-2">L3</th>
                        <th className="text-left text-zinc-400 p-2">L4</th>
                        <th className="text-left text-zinc-400 p-2">L5</th>
                        <th className="text-left text-zinc-400 p-2">L6</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(performanceLevels).map(([category, levels]) => (
                        <tr key={category} className="border-t border-zinc-700">
                          <td className="text-white p-2 font-medium">{category}</td>
                          {['L3', 'L4', 'L5', 'L6'].map((level) => (
                            <td 
                              key={level}
                              className={`text-zinc-400 p-2 ${
                                currentReview?.levels[category as keyof typeof currentReview.levels] === level
                                  ? 'bg-emerald-500/20 text-emerald-400 font-medium rounded'
                                  : ''
                              }`}
                            >
                              {levels[level as keyof LevelCriteria]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
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