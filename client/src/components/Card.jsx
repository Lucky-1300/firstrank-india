export default function Card({
  children,
  className = "",
  hover = false,
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 transition-all duration-300 ${
        hover ? "hover:shadow-xl hover:-translate-y-1 hover:border-orange-200 dark:hover:border-orange-500/30" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}