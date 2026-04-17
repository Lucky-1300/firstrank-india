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
    "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-gradient-to-r from-orange-500 to-orange-400 text-white hover:shadow-lg hover:-translate-y-0.5",
    secondary:
      "border border-orange-500 text-orange-600 hover:bg-orange-50",
    ghost:
      "text-gray-700 hover:bg-gray-100",
    dark:
      "bg-gray-900 text-white hover:bg-black",
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