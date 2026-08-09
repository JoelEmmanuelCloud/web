"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { StepIndicator } from "@/components/bespoke/step-indicator";
import { StepBox } from "@/components/bespoke/step-box";
import { StepTruffles } from "@/components/bespoke/step-truffles";
import { StepPersonalise } from "@/components/bespoke/step-personalise";
import { StepReview } from "@/components/bespoke/step-review";
import { LiveSummary, type BuilderState } from "@/components/bespoke/live-summary";
import { calculatePrice } from "@/lib/bespoke-config";
import { decodeBuilderState } from "@/lib/bespoke-share";
import type { Product } from "@/lib/products";

const initialState: BuilderState = {
  boxStyle: null,
  boxColour: null,
  size: null,
  flavours: {},
  personalise: {
    mode: "none",
    logoDataUrl: null,
    name: "",
    fontId: "script",
    foilColour: null,
  },
};

export function Builder({ truffleFlavours }: { truffleFlavours: Product[] }) {
  const searchParams = useSearchParams();
  const [step, setStep] = useState(0);
  const [state, setState] = useState<BuilderState>(() => {
    const decoded = decodeBuilderState(searchParams);
    return decoded ? { ...initialState, ...decoded } : initialState;
  });

  function patch(update: Partial<BuilderState>) {
    setState((prev) => ({ ...prev, ...update }));
  }

  const truffleCount = Object.values(state.flavours).reduce((a, b) => a + b, 0);
  const price = calculatePrice({
    truffleCount,
    hasPersonalisation: state.personalise.mode !== "none",
  });

  const canAdvance = [
    !!(state.boxStyle && state.boxColour && state.size),
    truffleCount === state.size,
    state.personalise.mode === "none" ||
      (state.personalise.mode === "logo" && !!state.personalise.logoDataUrl) ||
      (state.personalise.mode === "name" && !!state.personalise.name),
    true,
  ];

  return (
    <div className="px-6 pt-32 pb-28 sm:px-10 lg:pb-24">
      <div className="mx-auto max-w-6xl">
        <StepIndicator current={step} />

        <div className="grid gap-14 lg:grid-cols-[1fr_360px]">
          <div>
            {step === 0 && <StepBox state={state} onChange={patch} />}
            {step === 1 && (
              <StepTruffles
                state={state}
                onChange={patch}
                truffleFlavours={truffleFlavours}
              />
            )}
            {step === 2 && <StepPersonalise state={state} onChange={patch} />}
            {step === 3 && <StepReview state={state} price={price} />}

            <div className="mt-14 flex justify-between border-t border-line pt-8">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="tracked-label text-xs text-paper-dim transition-colors hover:text-paper disabled:opacity-30"
              >
                &larr; Back
              </button>
              {step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  disabled={!canAdvance[step]}
                  className="tracked-label flex h-[46px] items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-30"
                >
                  Continue
                </button>
              )}
            </div>
          </div>

          <LiveSummary state={state} price={price} />
        </div>
      </div>
    </div>
  );
}
