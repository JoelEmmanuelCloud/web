"use client";

import { useActionState, useState } from "react";
import { submitReview, type ReviewFormState } from "@/lib/reviews";
import { StarIcon } from "@/components/stars";

const initialState: ReviewFormState = {
  status: "idle",
  message: "",
  fieldErrors: {},
  values: { authorName: "", title: "", body: "" },
};

const inputClass =
  "w-full rounded-2xl border border-line bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper-dim focus:border-paper focus:outline-none";

export function ReviewForm({ productSlug }: { productSlug: string }) {
  const [state, formAction, isPending] = useActionState(
    submitReview.bind(null, productSlug),
    initialState,
  );
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  if (state.status === "success") {
    return (
      <p role="status" className="text-sm leading-7 text-paper">
        {state.message}
      </p>
    );
  }

  const shown = hover || rating;

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <fieldset className="flex flex-col gap-2">
        <legend className="tracked-label mb-2 text-xs text-paper-dim">
          Your Rating
        </legend>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <label
              key={n}
              className="cursor-pointer rounded-sm has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-paper"
              onMouseEnter={() => setHover(n)}
            >
              <input
                type="radio"
                name="rating"
                value={n}
                checked={rating === n}
                onChange={() => setRating(n)}
                className="sr-only"
              />
              <span className="sr-only">
                {n} {n === 1 ? "star" : "stars"}
              </span>
              <StarIcon filled={n <= shown} className="h-7 w-7" />
            </label>
          ))}
        </div>
        {state.fieldErrors.rating && (
          <p className="text-xs text-accent">{state.fieldErrors.rating}</p>
        )}
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className="tracked-label text-xs text-paper-dim">Your Name</span>
        <input
          type="text"
          name="authorName"
          required
          maxLength={60}
          autoComplete="given-name"
          defaultValue={state.values.authorName}
          className={inputClass}
        />
        {state.fieldErrors.authorName && (
          <span className="text-xs text-accent">
            {state.fieldErrors.authorName}
          </span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="tracked-label text-xs text-paper-dim">
          Review Title (Optional)
        </span>
        <input
          type="text"
          name="title"
          maxLength={100}
          defaultValue={state.values.title}
          className={inputClass}
        />
        {state.fieldErrors.title && (
          <span className="text-xs text-accent">{state.fieldErrors.title}</span>
        )}
      </label>

      <label className="flex flex-col gap-2">
        <span className="tracked-label text-xs text-paper-dim">Your Review</span>
        <textarea
          name="body"
          required
          minLength={10}
          maxLength={2000}
          rows={5}
          defaultValue={state.values.body}
          className={`${inputClass} resize-y`}
        />
        {state.fieldErrors.body && (
          <span className="text-xs text-accent">{state.fieldErrors.body}</span>
        )}
      </label>

      <div aria-hidden="true" className="absolute left-[-10000px] h-px w-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <p className="text-xs leading-6 text-paper-dim">
        Your name and review will be shown on this page once approved.
      </p>

      {state.status === "error" && state.message && (
        <p role="alert" className="text-xs text-accent">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="tracked-label flex h-[46px] w-full max-w-xs items-center justify-center rounded-full bg-paper px-8 text-xs text-ink transition-colors hover:bg-accent hover:text-accent-ink disabled:opacity-60"
      >
        {isPending ? "Sending…" : "Submit Review"}
      </button>
    </form>
  );
}
