export default function MetricsSection() {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">Team Metrics Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">Average PR Review Time</p>
            <p className="text-2xl font-bold text-white">1.2 days</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">Code Quality Score</p>
            <p className="text-2xl font-bold text-emerald-500">8.5/10</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">Team Velocity</p>
            <p className="text-2xl font-bold text-white">87 pts</p>
          </div>
          <div className="bg-zinc-800 p-4 rounded-lg">
            <p className="text-zinc-400 text-sm">Active Projects</p>
            <p className="text-2xl font-bold text-white">12</p>
          </div>
        </div>
      </div>
    );
  } 