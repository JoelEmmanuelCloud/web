const steps = ["Box", "Truffles", "Personalise", "Review"];

export function StepIndicator({ current }: { current: number }) {
  return (
    <div className="sticky top-24 z-30 mb-12 flex w-full bg-ink py-4">
      {steps.map((step, i) => (
        <div key={step} className="flex flex-1 flex-col gap-3">
          <div className="h-[2px] w-full bg-line">
            <div
              className="h-full bg-accent transition-all duration-500"
              style={{ width: i <= current ? "100%" : "0%" }}
            />
          </div>
          <p
            className={`tracked-label text-[10px] transition-colors ${
              i === current ? "text-paper" : "text-paper-dim"
            }`}
          >
            {i + 1}. {step}
          </p>
        </div>
      ))}
    </div>
  );
}
