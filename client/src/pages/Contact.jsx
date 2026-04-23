import Card from "../components/Card";
import Button from "../components/Button";

export default function Contact() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 py-10 sm:py-14 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">Contact</p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-black text-gray-900 dark:text-white">Get in Touch</h1>
          <p className="mt-4 text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
            Have questions or need help? We’re here for you.
          </p>
        </section>

        <section className="mt-10 grid lg:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Details</h3>
            <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-slate-300">
              <p>📧 <b>Email:</b> support@firstrankindia.com</p>
              <p>📱 <b>Phone:</b> +91 98765 43210</p>
            </div>
          </Card>

          <Card>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Send us a message</h3>
            <form className="mt-6 space-y-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">Message</label>
              <textarea
                rows={4}
                placeholder="Write your message"
                className="w-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-orange-400"
              />
              <Button type="button">Send Message</Button>
            </form>
          </Card>
        </section>
      </div>
    </main>
  );
}
