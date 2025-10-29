const Badge = ({
  text,
  variant,
}: {
  text: string;
  variant: "pink" | "yellow" | "red" | "area";
}) => {
  const variantStyles = {
    pink: "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200",
    yellow: "bg-yellow-50 text-yellow-700 border-yellow-200",
    red: "bg-rose-50 text-rose-700 border-rose-200",
    area: "border-blue-200 bg-blue-50 text-blue-700",
  };

  return (
    <span
      className={`${variantStyles[variant]} text-xs font-medium leading-[26px] px-3 inline-flex items-center gap-2 rounded-md border border-solid`}
    >
      {variant === "area" ? (
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17 12.8506H14.7119V11.3428H15.4912V2.50781H9.69922V4.54004H8.19141V2.50781H2.50781V8.21094H4.48242L4.4834 9.71875H2.50781V15.4209H8.31055V8.73633H9.81934V11.3467H11.3906V12.8545H9.81934V16.9297H0.999023V1H17V12.8506Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="3" cy="3" r="3" fill="currentColor" />
        </svg>
      )}

      <span>{text}</span>
    </span>
  );
};

export default Badge;
