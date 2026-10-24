import type { ProductReview } from "@/lib/shopify-admin";
import { ReviewForm } from "@/components/review-form";
import { Stars } from "@/components/stars";

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function averageRating(reviews: ProductReview[]) {
  if (reviews.length === 0) return 0;
  return reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
}

export function ProductReviews({
  productSlug,
  reviews,
}: {
  productSlug: string;
  reviews: ProductReview[];
}) {
  const average = averageRating(reviews);

  return (
    <section
      id="reviews"
      className="mt-24 scroll-mt-32 border-t border-line pt-16"
    >
      <div className="grid gap-14 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div>
            <h2 className="tracked-display text-lg text-accent sm:text-xl">
              Reviews
            </h2>
            {reviews.length > 0 ? (
              <div className="mt-4 flex items-center gap-3">
                <Stars rating={average} className="h-5 w-5" />
                <span className="text-sm text-paper-dim">
                  {average.toFixed(1)} out of 5, from {reviews.length}{" "}
                  {reviews.length === 1 ? "review" : "reviews"}
                </span>
              </div>
            ) : (
              <p className="mt-4 text-sm text-paper-dim">
                No reviews yet. Be the first to share your thoughts.
              </p>
            )}
          </div>

          {reviews.length > 0 && (
            <ul className="flex flex-col gap-8">
              {reviews.map((review) => (
                <li key={review.id} className="border-l border-line pl-5">
                  <Stars rating={review.rating} />
                  {review.title && (
                    <p className="mt-3 text-sm text-paper">{review.title}</p>
                  )}
                  <p className="mt-2 whitespace-pre-line text-sm leading-7 text-paper-dim">
                    {review.body}
                  </p>
                  <p className="tracked-label mt-3 text-[10px] text-paper-dim">
                    {review.authorName}
                    {review.submittedAt &&
                      `, ${dateFormat.format(new Date(review.submittedAt))}`}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <p className="tracked-label text-xs text-paper">Write A Review</p>
          <ReviewForm productSlug={productSlug} />
        </div>
      </div>
    </section>
  );
}
