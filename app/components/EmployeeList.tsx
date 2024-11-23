import { Employee } from '@/Types/types';

export default function EmployeeList({ onSelectEmployee, onReviewAll }: {
  onSelectEmployee: (employee: Employee) => void;
  onReviewAll: () => void;
}) {
  const employees: Employee[] = [
    { id: "1", name: "John Doe", position: "Software Engineer", github: "johndoe", slack: "john.doe" },
    { id: "2", name: "Jane Smith", position: "Product Manager", github: "jsmith", slack: "jane.smith" },
    { id: "3", name: "Mike Johnson", position: "UX Designer", github: "mikej", slack: "mike.johnson" },
    { id: "4", name: "Sarah Williams", position: "Data Scientist", github: "swilliams", slack: "sarah.w" },
    { id: "5", name: "Alex Brown", position: "Backend Developer", github: "abrown", slack: "alex.brown" },
    { id: "6", name: "Emma Wilson", position: "Frontend Developer", github: "ewilson", slack: "emma.w" },
    // Add more employees as needed
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
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {employees.map((employee) => (
          <div
            key={employee.id}
            onClick={() => onSelectEmployee(employee)}
            className="p-4 bg-zinc-800 rounded cursor-pointer hover:bg-zinc-700"
          >
            <h3 className="text-white font-medium">{employee.name}</h3>
            <p className="text-zinc-400">{employee.position}</p>
          </div>
        ))}
      </div>
    </div>
  );
}