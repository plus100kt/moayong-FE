type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const getPosts = async (): Promise<PostType[]> => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', { cache: 'no-store' }).then(
    (res) => res.json()
  );

  return res;
};

export default getPosts;
