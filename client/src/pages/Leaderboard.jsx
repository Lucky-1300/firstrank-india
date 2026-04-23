import Card from "../components/Card";
import Button from "../components/Button";
import { MapPin, Crown } from "lucide-react";

export default function Leaderboard() {
  const leaders = [
    ["Priya Sharma", "Delhi", 98],
    ["Aman Khurana", "Mumbai", 96],
    ["Isha Patel", "Ahmedabad", 95],
    ["Rohan Singh", "Pune", 92],
    ["Neha Gupta", "Lucknow", 90],
    ["Arjun Kumar", "Bangalore", 88],
    ["Deepika Verma", "Jaipur", 86],
    ["Karan Mehra", "Chennai", 84],
    ["Anjali Singh", "Bhopal", 82],
    ["Vikram Desai", "Surat", 80],
  ];

  const topThree = leaders.slice(0, 3);
  const currentUser = { name: "You", city: "Delhi", rank: 18, score: 78 };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-8 sm:py-10 lg:py-14 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="text-center">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Rankings
          </p>

          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-tight transition-colors duration-300">
            🏆 National Leaderboard
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-gray-500 dark:text-slate-300 max-w-2xl mx-auto transition-colors duration-300">
            See how ambitious students rank across India based on real skills and performance.
          </p>
        </section>

        {/* Highlight User Rank */}
        <section className="mt-8 sm:mt-10">
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div>
                <p className="text-white/80 text-sm uppercase tracking-widest font-semibold">
                  Your Current Rank
                </p>
                <h2 className="mt-2 text-3xl sm:text-4xl font-black">
                  #{currentUser.rank} Nationally
                </h2>
                <p className="mt-2 text-white/90">
                  {currentUser.name} from {currentUser.city} is currently in the highlighted rank zone.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 w-full lg:w-auto">
                {[
                  ["City", `#2`],
                  ["State", `#9`],
                  ["National", `#${currentUser.rank}`],
                ].map(([label, value]) => (
                  <div key={label} className="bg-white/15 border border-white/20 rounded-2xl px-4 py-4 text-center backdrop-blur-sm min-w-[92px]">
                    <p className="text-xs uppercase tracking-widest text-white/75">{label}</p>
                    <p className="mt-1 text-2xl font-black">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </section>

        {/* Filters */}
        <section className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="sm">All India</Button>
          <Button variant="secondary" size="sm">This Month</Button>
          <Button variant="secondary" size="sm">Students</Button>
        </section>

        {/* Top 3 */}
        <section className="mt-10 sm:mt-14 grid md:grid-cols-3 gap-5 sm:gap-6">
          {topThree.map((user, i) => (
            <Card
              key={i}
              hover
              className={`text-center relative overflow-hidden ${
                i === 0 ? "md:-mt-4 border-2 border-orange-300" : ""
              }`}
            >
              {i === 0 && (
                <span className="absolute top-0 right-0 bg-orange-500 text-white text-xs px-3 py-1 rounded-bl-xl">
                  #1
                </span>
              )}

              <div className="text-5xl sm:text-6xl">
                {i === 0 ? "🥇" : i === 1 ? "🥈" : "🥉"}
              </div>

              <div className="mt-4 w-14 h-14 mx-auto rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xl font-black">
                {user[0].charAt(0)}
              </div>

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {user[0]}
              </h3>

              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400 flex items-center justify-center gap-2 transition-colors duration-300">
                <MapPin size={14} />
                {user[1]}
              </p>

              <p className="mt-2 text-orange-500 font-bold text-lg">
                {user[2]}%
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Performance Score
              </p>
            </Card>
          ))}
        </section>

        {/* Mobile Cards */}
        <section className="mt-10 space-y-4 md:hidden">
          {leaders.map((user, i) => (
            <Card key={i} className="flex items-center justify-between hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
                  #{i + 1}
                </span>

                <div>
                  <p className="font-semibold text-gray-900 dark:text-white transition-colors duration-300">
                    {user[0]}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 transition-colors duration-300">
                    <MapPin size={12} />
                    {user[1]}
                  </p>
                </div>
              </div>

              <span className="font-bold text-orange-500 shrink-0">
                {user[2]}%
              </span>
            </Card>
          ))}
        </section>

        {/* Desktop Table */}
        <section className="hidden md:block mt-10">
          <Card className="overflow-hidden p-0 hover:shadow-lg transition-all duration-300">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[620px]">
                <thead className="bg-gray-100 dark:bg-slate-800 text-sm text-gray-500 dark:text-slate-300 transition-colors duration-300">
                  <tr>
                    <th className="px-6 py-4">Rank</th>
                    <th className="px-6 py-4">Student</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Score</th>
                  </tr>
                </thead>

                <tbody>
                  {leaders.map((user, i) => (
                    <tr
                      key={i}
                      className="border-t border-gray-100 dark:border-slate-800 hover:bg-orange-50 dark:hover:bg-white/5 transition-colors duration-300"
                    >
                      <td className="px-6 py-4 font-bold text-gray-800 dark:text-slate-200 transition-colors duration-300">
                        #{i + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                            {user[0].charAt(0)}
                          </span>

                          <div>
                            <span className="font-medium text-gray-900 dark:text-white block transition-colors duration-300">
                              {user[0]}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 transition-colors duration-300">
                              <MapPin size={12} />
                              {user[1]}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-500 dark:text-slate-400 transition-colors duration-300">
                        Student
                      </td>

                      <td className="px-6 py-4 font-bold text-orange-500">
                        {user[2]}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* CTA */}
        <section className="mt-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white transition-colors duration-300">
            Want To See Your Name Here?
          </h3>

          <p className="mt-3 text-gray-500 dark:text-slate-400 transition-colors duration-300">
            Take assessments and improve your national rank.
          </p>

          <div className="mt-6">
            <Button className="inline-flex items-center gap-2">
              <Crown size={18} />
              Start Free Test
            </Button>
          </div>
        </section>

      </div>
    </main>
  );
}