'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import getPosts from 'src/_api/testPosts/getPosts';

/**
 * @description props 가 없는 이유 (부모에서 dehydrate 하여 내려주는 중)
 
서버 컴포넌트에서:
  1. queryClient.prefetchQuery를 사용해 데이터를 미리 가져옵니다.
  2. dehydrate를 사용해 이 데이터를 직렬화합니다.
  3. HydrationBoundary를 통해 이 직렬화된 데이터를 클라이언트로 전달합니다.

클라이언트 컴포넌트에서:
  1. useQuery를 호출할 때, React Query는 먼저 HydrationBoundary를 통해 전달된 캐시를 확인합니다.
  2. 캐시에 해당 queryKey의 데이터가 있으면, 그 데이터를 즉시 반환합니다.
  3. 이 과정에서 props로 명시적으로 데이터를 전달하지 않아도 됩니다.

이 방식의 장점:
  - 코드의 일관성: 서버와 클라이언트에서 동일한 쿼리 로직을 사용할 수 있습니다.
  - 자동 동기화: 클라이언트에서 데이터를 수정하면 캐시가 자동으로 업데이트됩니다.
  - 코드 분리: 데이터 fetching 로직을 컴포넌트에서 분리할 수 있습니다.

따라서, props로 명시적으로 전달하지 않아도 React Query가 내부적으로 캐시를 관리하고 동기화하여 데이터를 제공합니다.
*/
/**
 * @description props 방식은?

props를 사용하는 방식과 React Query의 useQuery를 사용하는 방식 모두 장단점이 있습니다:

useQuery 방식의 장점:
  - 데이터 관리 일관성: 서버와 클라이언트에서 동일한 로직 사용
  - 자동 캐싱 및 재검증: React Query가 자동으로 처리
  - 코드 재사용성: 여러 컴포넌트에서 동일한 쿼리 로직 사용 가능
  - 상태 관리 간소화: 로딩, 에러 상태 등을 자동으로 처리

props 방식의 장점:
  - 명시적 데이터 흐름: 부모-자식 간 데이터 전달이 명확
  - 테스트 용이성: 컴포넌트 단위 테스트가 더 쉬움
  - 의존성 감소: 외부 라이브러리에 덜 의존적

선택은 프로젝트의 복잡성, 팀의 선호도, 성능 요구사항 등에 따라 달라질 수 있습니다.
복잡한 데이터 관리가 필요한 대규모 앱에서는 useQuery 방식이 유리할 수 있고,
간단한 데이터 전달이 주로 필요한 소규모 앱에서는 props 방식이 더 적합할 수 있습니다.
 */
const QueryTestCompo = () => {
  const { data, error }: any = useQuery({ queryKey: ['test-posts'], queryFn: getPosts });

  if (error) {
    return <div>Error fetching posts</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <h2>Posts (Prefetched on Server)</h2>
      {data?.map(({ title, id }: any) => (
        <div key={id}>{title}</div>
      ))}
    </div>
  );
};

export default QueryTestCompo;
