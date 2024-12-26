export type ProgressType = {
  title: string;
  score: number | string;
  grade: string;
  className?: string;
  variant?: "BLUE" | "YELLOW";
};

export default function Progress({
  title,
  score,
  className,
  grade,
  variant = "YELLOW",
}: ProgressType) {
  const w = `w-[${score}%]`;
  return (
    <div className={className}>
      <div className="flex items-center justify-between">
        <span className="font-semibold">{title}</span>
        <span className="font-medium">
          {score} | {grade}
        </span>
      </div>
      <div className="w-full mt-1 bg-white h-4 rounded-3xl  relative">
        {variant == "YELLOW" ? (
          <div
            style={{ width: `${score}%` }}
            className={`transition-all bg-[radial-gradient(79.69%_647.97%_at_40.95%_50%,#FFDE59_0%,#F3A146_100%)] h-full absolute rounded-3xl`}
          />
        ) : (
          <div
            style={{ width: `${score}%` }}
            className={`transition-all bg-[radial-gradient(79.69%_647.97%_at_40.95%_50%,#5EACDD_0%,#3158E2_100%)] h-full absolute rounded-3xl`}
          />
        )}
      </div>
    </div>
  );
}
