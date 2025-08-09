import agent from "../api/agent";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router";

export const useActivities = (id?: string) => {
  const queryClient = useQueryClient();
  const location = useLocation();
  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.post<Activity>("/activities", activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      await agent.delete(`/activities/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      await agent.put<Activity>(`/activities`, activity);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const { data: activity, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["activity", id],
    queryFn: async () => {
      const response = await agent.get<Activity>(`/activities/${id}`);
      return response.data;
    },
    enabled: !!id,
  });
  const { data: activities, isPending } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<Activity[]>("/activities");
      return response.data;
    },
    enabled: !id && location.pathname === "/activities",
    staleTime: 1000 * 5,
  });

  return {
    activities,
    isPending,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
