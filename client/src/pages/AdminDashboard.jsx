import Card from "../components/Card";
import Button from "../components/Button";

export default function AdminDashboard() {
  const users = [
    {
      name: "Priya Sharma",
      email: "priya@gmail.com",
      category: "Student",
      joined: "12 Apr",
    },
    {
      name: "Rahul Verma",
      email: "rahul@gmail.com",
      category: "Business",
      joined: "10 Apr",
    },
    {
      name: "Ananya Singh",
      email: "ananya@gmail.com",
      category: "Job",
      joined: "08 Apr",
    },
    {
      name: "Rohan Kumar",
      email: "rohan@gmail.com",
      category: "Student",
      joined: "06 Apr",
    },
  ];

  const stats = [
    ["Total Users", "50,248"],
    ["Active Exams", "12"],
    ["Tests Today", "1,248"],
    ["Revenue", "₹1.8L"],
  ];

  const summary = [
    ["New Signups Today", "182"],
    ["Tests Submitted", "1,248"],
    ["Avg Score", "81%"],
    ["Top Category", "Student"],
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <section className="flex flex-col lg:flex-row gap-5 lg:items-center lg:justify-between">
          <div>
            <p className="text-orange-500 text-xs sm:text-sm font-bold uppercase tracking-[0.25em]">
              Admin Panel
            </p>

            <h1 className="mt-3 text-3xl sm:text-5xl font-black text-gray-900">
              Admin Dashboard
            </h1>

            <p className="mt-3 text-sm sm:text-base text-gray-500">
              Manage users, exams, analytics and platform growth.
            </p>
          </div>

          <div className="w-full sm:w-auto">
            <Button fullWidth className="sm:w-auto">
              + Create New Exam
            </Button>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map(([title, value], i) => (
            <Card key={i} className="p-5">
              <p className="text-xs sm:text-sm text-gray-500">
                {title}
              </p>

              <h3 className="mt-2 text-2xl sm:text-3xl font-black text-orange-500">
                {value}
              </h3>
            </Card>
          ))}
        </section>

        {/* Main Grid */}
        <section className="mt-8 sm:mt-10 grid lg:grid-cols-3 gap-6">

          {/* Recent Users */}
          <Card className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                Recent Users
              </h3>

              <button className="text-sm font-semibold text-orange-500 hover:text-orange-600">
                View All
              </button>
            </div>

            {/* Mobile Cards */}
            <div className="mt-6 space-y-4 sm:hidden">
              {users.map((user, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-100 p-4 bg-white"
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <p className="text-sm text-gray-500 break-all">
                        {user.email}
                      </p>
                    </div>

                    <span className="text-xs text-gray-500">
                      {user.joined}
                    </span>
                  </div>

                  <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-xs font-medium">
                    {user.category}
                  </span>
                </div>
              ))}
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block mt-6 overflow-x-auto">
              <table className="w-full text-left min-w-[620px]">
                <thead className="border-b text-sm text-gray-500">
                  <tr>
                    <th className="pb-4">Name</th>
                    <th className="pb-4">Email</th>
                    <th className="pb-4">Category</th>
                    <th className="pb-4">Joined</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user, i) => (
                    <tr
                      key={i}
                      className="border-b last:border-0 hover:bg-orange-50 transition"
                    >
                      <td className="py-4 font-medium text-gray-900">
                        {user.name}
                      </td>

                      <td className="py-4 text-gray-600">
                        {user.email}
                      </td>

                      <td className="py-4">
                        <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-sm font-medium">
                          {user.category}
                        </span>
                      </td>

                      <td className="py-4 text-gray-500">
                        {user.joined}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Quick Actions
            </h3>

            <div className="space-y-4 mt-6">
              <Button fullWidth>
                Add New User
              </Button>

              <Button fullWidth variant="secondary">
                Create Exam
              </Button>

              <Button fullWidth variant="secondary">
                Publish Rankings
              </Button>

              <Button fullWidth variant="secondary">
                Export Reports
              </Button>
            </div>
          </Card>

        </section>

        {/* Analytics */}
        <section className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6">

          {/* Activity */}
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Daily Activity
            </h3>

            <div className="mt-6 flex items-end gap-2 sm:gap-3 h-52">
              {[60, 80, 45, 95, 70, 88, 76].map((item, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-xl bg-gradient-to-t from-orange-500 to-orange-400"
                  style={{ height: `${item}%` }}
                />
              ))}
            </div>

            <div className="mt-4 grid grid-cols-7 text-center text-xs text-gray-400">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <span key={i}>{day}</span>
              ))}
            </div>
          </Card>

          {/* Summary */}
          <Card>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
              Platform Summary
            </h3>

            <div className="space-y-5 mt-6">
              {summary.map(([title, value], i) => (
                <div
                  key={i}
                  className="flex justify-between gap-4 text-sm sm:text-base"
                >
                  <span className="text-gray-500">
                    {title}
                  </span>

                  <span className="font-semibold text-gray-900">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </Card>

        </section>

      </div>
    </main>
  );
}