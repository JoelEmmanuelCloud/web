const STAR_PATH =
  "M12 2.5l2.94 5.96 6.56.95-4.75 4.63 1.12 6.54L12 17.5l-5.87 3.08 1.12-6.54L2.5 9.41l6.56-.95L12 2.5z";

export function StarIcon({
  filled,
  className,
}: {
  filled: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`${className ?? "h-4 w-4"} ${filled ? "text-accent" : "text-paper-dim/40"}`}
    >
      <path
        d={STAR_PATH}
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Stars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  const rounded = Math.round(rating);
  return (
    <span
      role="img"
      aria-label={`${rating.toFixed(1).replace(/\.0$/, "")} out of 5 stars`}
      className="inline-flex items-center gap-0.5"
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= rounded} className={className} />
      ))}
    </span>
  );
}
