import { Employee } from '@/Types/types';

export default function EmployeeList({ onSelectEmployee, onReviewAll }: {
  onSelectEmployee: (employee: Employee) => void;
  onReviewAll: () => void;
}) {
  const employees: Employee[] = [
    { id: "1", name: "John Doe", position: "Software Engineer", level: "L4", github: "johndoe", slack: "john.doe" },
    { id: "2", name: "Jane Smith", position: "Product Manager", level: "L5", github: "jsmith", slack: "jane.smith" },
    { id: "3", name: "Mike Johnson", position: "UX Designer", level: "L3", github: "mikej", slack: "mike.johnson" },
    { id: "4", name: "Sarah Williams", position: "Data Scientist", level: "L4", github: "swilliams", slack: "sarah.w" },
    { id: "5", name: "Alex Brown", position: "Backend Developer", level: "L6", github: "abrown", slack: "alex.brown" },
    { id: "6", name: "Emma Wilson", position: "Frontend Developer", level: "L3", github: "ewilson", slack: "emma.w" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Employees</h2>
        <button 
          onClick={onReviewAll}
          className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg
            border border-white/20 hover:border-white transition-all duration-200 ease-in-out
            hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:transform hover:scale-[1.02]"
        >
          Review All
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[600px] overflow-y-auto pr-2">
        {employees.map((employee) => (
          <div
            key={employee.id}
            onClick={() => onSelectEmployee(employee)}
            className="p-4 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700 transition-colors duration-200"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-white font-medium">{employee.name}</h3>
                <p className="text-zinc-400">
                  {employee.position}
                  <span className="ml-2 px-2 py-0.5 bg-zinc-800 rounded text-sm text-zinc-300">
                    {employee.level}
                  </span>
                </p>
              </div>
              <div className="bg-zinc-700 rounded-full p-2">
                <svg className="w-4 h-4 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-zinc-700">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-zinc-400 min-w-0 flex-1">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="truncate">@{employee.github}</span>
                </div>
                <div className="flex items-center gap-1 text-zinc-400 min-w-0 flex-1">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"/>
                  </svg>
                  <span className="truncate">@{employee.slack}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}