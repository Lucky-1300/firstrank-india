export default function LoadingSpinner({ label = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-sm text-orange-600 dark:text-orange-400 transition-colors duration-300 ${
        fullScreen ? "min-h-screen bg-white dark:bg-slate-950" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 dark:border-orange-900 border-t-orange-500 dark:border-t-orange-400 transition-colors duration-300" />
      <span>{label}</span>
    </div>
  );
}