export default function LoadingSpinner({ label = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`flex items-center justify-center gap-3 text-sm text-orange-600 ${
        fullScreen ? "min-h-screen" : ""
      }`}
      role="status"
      aria-live="polite"
    >
      <span className="h-5 w-5 animate-spin rounded-full border-2 border-orange-200 border-t-orange-500" />
      <span>{label}</span>
    </div>
  );
}