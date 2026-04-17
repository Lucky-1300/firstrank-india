import Card from "../components/Card";
import Button from "../components/Button";

export default function Leaderboard() {
  const leaders = [
    ["Priya Sharma", 98],
    ["Aman Khurana", 96],
    ["Isha Patel", 95],
    ["Rohan Singh", 92],
    ["Neha Gupta", 90],
    ["Arjun Kumar", 88],
    ["Deepika Verma", 86],
    ["Karan Mehra", 84],
    ["Anjali Singh", 82],
    ["Vikram Desai", 80],
  ];

  const topThree = leaders.slice(0, 3);

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10 lg:py-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="text-center">
          <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
            Rankings
          </p>

          <h1 className="mt-3 text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight">
            🏆 National Leaderboard
          </h1>

          <p className="mt-4 text-sm sm:text-lg text-gray-500 max-w-2xl mx-auto">
            See how ambitious students rank across India based on real skills and performance.
          </p>
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

              <h3 className="mt-4 text-xl sm:text-2xl font-bold text-gray-900">
                {user[0]}
              </h3>

              <p className="mt-2 text-orange-500 font-bold text-lg">
                {user[1]}%
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
            <Card key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                  #{i + 1}
                </span>

                <div>
                  <p className="font-semibold text-gray-900">
                    {user[0]}
                  </p>

                  <p className="text-xs text-gray-500">
                    National Rank
                  </p>
                </div>
              </div>

              <span className="font-bold text-orange-500">
                {user[1]}%
              </span>
            </Card>
          ))}
        </section>

        {/* Desktop Table */}
        <section className="hidden md:block mt-10">
          <Card className="overflow-hidden p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[620px]">
                <thead className="bg-gray-100 text-sm text-gray-500">
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
                      className="border-t hover:bg-orange-50 transition"
                    >
                      <td className="px-6 py-4 font-bold text-gray-800">
                        #{i + 1}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                            {user[0].charAt(0)}
                          </span>

                          <span className="font-medium text-gray-900">
                            {user[0]}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-gray-500">
                        Student
                      </td>

                      <td className="px-6 py-4 font-bold text-orange-500">
                        {user[1]}%
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
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900">
            Want To See Your Name Here?
          </h3>

          <p className="mt-3 text-gray-500">
            Take assessments and improve your national rank.
          </p>

          <div className="mt-6">
            <Button>Start Free Test</Button>
          </div>
        </section>

      </div>
    </main>
  );
}