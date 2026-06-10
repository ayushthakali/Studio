import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export function getErrorMessage(error: unknown): string {
  const err = error as FetchBaseQueryError & { data?: { message?: string } };
  return err.data?.message || "Something went wrong";
}
