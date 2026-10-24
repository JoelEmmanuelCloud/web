"use server";

import { getProductBySlug } from "@/lib/products";
import { createDraftReview } from "@/lib/shopify-admin";

export type ReviewFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<"rating" | "authorName" | "title" | "body", string>>;
  values: { authorName: string; title: string; body: string };
};

const emptyValues = { authorName: "", title: "", body: "" };

const LIMITS = {
  authorName: 60,
  title: 100,
  bodyMin: 10,
  bodyMax: 2000,
};

function cleanText(value: FormDataEntryValue | null, multiline: boolean) {
  if (typeof value !== "string") return "";
  const pattern = multiline
    ? /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g
    : /[\u0000-\u001F\u007F]/g;
  return value.replace(pattern, "").trim();
}

export async function submitReview(
  productSlug: string,
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  if (cleanText(formData.get("website"), false)) {
    return {
      status: "success",
      message: "Thank you for your review.",
      fieldErrors: {},
      values: emptyValues,
    };
  }

  const product = await getProductBySlug(productSlug);
  if (!product) {
    return {
      status: "error",
      message: "This product could not be found.",
      fieldErrors: {},
      values: emptyValues,
    };
  }

  const rating = Number(formData.get("rating"));
  const authorName = cleanText(formData.get("authorName"), false);
  const title = cleanText(formData.get("title"), false);
  const body = cleanText(formData.get("body"), true);
  const values = { authorName, title, body };

  const fieldErrors: ReviewFormState["fieldErrors"] = {};
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    fieldErrors.rating = "Please choose a star rating.";
  }
  if (!authorName) {
    fieldErrors.authorName = "Please enter your name.";
  } else if (authorName.length > LIMITS.authorName) {
    fieldErrors.authorName = `Please keep your name under ${LIMITS.authorName} characters.`;
  }
  if (title.length > LIMITS.title) {
    fieldErrors.title = `Please keep the title under ${LIMITS.title} characters.`;
  }
  if (body.length < LIMITS.bodyMin) {
    fieldErrors.body = `Please write at least ${LIMITS.bodyMin} characters.`;
  } else if (body.length > LIMITS.bodyMax) {
    fieldErrors.body = `Please keep your review under ${LIMITS.bodyMax} characters.`;
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please check the form and try again.",
      fieldErrors,
      values,
    };
  }

  const saved = await createDraftReview({
    productHandle: product.shopifyHandle ?? product.slug,
    rating,
    title,
    body,
    authorName,
  });

  if (!saved) {
    return {
      status: "error",
      message: "Something went wrong sending your review. Please try again.",
      fieldErrors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you for your review. It will appear here once it has been approved.",
    fieldErrors: {},
    values: emptyValues,
  };
}
