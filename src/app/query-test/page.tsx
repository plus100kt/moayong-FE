import {
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { queryClient } from 'src/_lib/utils';
import QueryTestCompo from 'src/_components/QueryTestCompo';
import getPosts from 'src/_api/testPosts/getPosts';

/**
 * dehydrate는 주로 서버 컴포넌트에서 사용되며, 클라이언트 컴포넌트로 데이터를 전달할 때 사용
 */
const QueryTest =  async () => {
  await queryClient.prefetchQuery({
    queryKey: ['test-posts'],
    queryFn: getPosts,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <QueryTestCompo />
    </HydrationBoundary>
  );
}


export default QueryTest;
