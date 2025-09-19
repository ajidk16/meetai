"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data, isLoading, error } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions()
  );

  return <div>{JSON.stringify({ data, isLoading, error })}</div>;
};

export const AgentsViewLoading = () => (
  <LoadingState
    title="Loading Agents"
    description="This may take a few seconds..."
  />
);

export const AgentsViewError = () => (
  <ErrorState
    title="Error Loading Agents"
    description={"Something went wrong. Please try again later."}
  />
);
