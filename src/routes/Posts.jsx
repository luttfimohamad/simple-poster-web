import PostsList from '../components/PostsList';
import { Outlet } from 'react-router-dom';

export default function Posts() {
  return (
    <>
      <Outlet />
      <main>
        <PostsList />
      </main>
    </>
  );
}

export async function loader() {
  const response = await fetch(
    'https://simple-poster-api-production.up.railway.app/posts'
  );
  const resData = await response.json();
  return resData.posts;
}
