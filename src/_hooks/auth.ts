import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { getMe } from "src/_api/api";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
  });

  useEffect(() => {
    if (!user) {
      alert("로그인이 필요해요.");
      router.push("/login");
    }
  }, [user]);

  return { user };
};
