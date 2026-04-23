export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 ease-out active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-400/40";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:shadow-lg hover:-translate-y-0.5 hover:from-orange-600 hover:to-orange-500",
    secondary:
      "border border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-500/10",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/10",
    dark:
      "bg-gray-900 text-white hover:bg-black dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}