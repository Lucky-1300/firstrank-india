import Card from "../components/Card";
import Button from "../components/Button";

export default function MyProfile() {
  const user = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 py-8 sm:py-10 lg:py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold text-orange-500 uppercase tracking-widest">
            Account
          </p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-black text-gray-900 dark:text-white transition-colors duration-300">
            My Profile
          </h1>
        </div>

        <Card className="hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-2xl font-black">
              {(user?.name?.charAt(0) || user?.email?.charAt(0) || "U").toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                {user?.name || "User"}
              </p>
              <p className="text-sm text-gray-500 dark:text-slate-400 transition-colors duration-300">
                {user?.email || "No email found"}
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400">Category</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-slate-100 capitalize">{user?.category || "student"}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-slate-400">Member Since</p>
              <p className="mt-1 font-medium text-gray-900 dark:text-slate-100">2026</p>
            </div>
          </div>

          <div className="mt-8">
            <Button size="sm">Edit Profile</Button>
          </div>
        </Card>
      </div>
    </main>
  );
}
