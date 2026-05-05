export default function Card({
  children,
  className = "",
  hover = false,
}) {
  return (
    <div
      className={`bg-white/95 dark:bg-slate-900/90 rounded-3xl border border-white/70 dark:border-slate-800 shadow-sm p-6 transition-all duration-300 backdrop-blur-sm ${
        hover ? "hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 dark:hover:border-orange-500/30" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}