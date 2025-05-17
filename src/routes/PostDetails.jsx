import {
  useLoaderData,
  useRevalidator,
  Link,
  useNavigate,
} from 'react-router-dom';
import Modal from '../components/Modal';
import classes from './PostDetails.module.css';

export default function PostDetails() {
  const post = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate(); // <- tambahkan ini

  async function handleDelete() {
    const shouldDelete = window.confirm(
      'Are you sure you want to delete this post?'
    );
    if (!shouldDelete) return;

    const response = await fetch('http://localhost:8080/posts/' + post.id, {
      method: 'DELETE',
    });

    if (response.ok) {
      navigate('/'); // navigasi ke halaman utama
      setTimeout(() => {
        revalidator.revalidate(); // force refresh list post
      }, 100);
    } else {
      alert('Failed to delete the post.');
    }
  }

  if (!post) {
    return (
      <Modal>
        <main className={classes.details}>
          <h1>Could not find post</h1>
          <p>Unfortunately, the requested post could not be found.</p>
          <p>
            <Link to=".." className={classes.btn}>
              Okay
            </Link>
          </p>
        </main>
      </Modal>
    );
  }

  return (
    <Modal>
      <main className={classes.details}>
        <p className={classes.author}>{post.author}</p>
        <p className={classes.text}>{post.body}</p>
        <div className={classes.actions}>
          <button onClick={handleDelete}>Delete Post</button>
          <button>
            <Link to=".." type="button">
              Back
            </Link>
          </button>
        </div>
      </main>
    </Modal>
  );
}

export async function loader({ params }) {
  const response = await fetch('http://localhost:8080/posts/' + params.id);
  const resData = await response.json();
  return resData.post;
}
