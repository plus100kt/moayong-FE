import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useEffect } from "react";
import { getActiveMemberByUserId } from "src/_api/api";
import { LeagueMember } from "src/_types/type";

export const useActiveMember = (userId: number) => {
  const { data: activeMember, isError, error } = useQuery<LeagueMember>({
    queryKey: ["activeMember"],
    queryFn: () => getActiveMemberByUserId(userId),
    enabled: !!userId,
  });

  useEffect(() => {
    if (isError) {
      handleError(error as AxiosError);
    }
  }, [isError, error]);

  const handleError = async (error: AxiosError) => {
    if (isError) {
      const statusCode = error.response?.status;
      const errorCode = (error.response?.data as { code?: string })?.code;
    }
  };
  return { activeMember };
};
