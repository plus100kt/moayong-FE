import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모아용",
  description: "모아용 온보딩 페이지, 아주 친절하지.",
};
export default async function layout({ children }: { children: React.ReactNode }) {
  // API 호출을 통해 가져오는 데이터까지 SEO에 태울 수 있다.
  return <div>{children}</div>;
}
