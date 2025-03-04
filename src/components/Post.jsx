import React from 'react'
import classes from './Post.module.css';
import { Link } from 'react-router-dom';

export default function Post({id, author, body}) {
  return (
    <div className={classes.post}>
      <Link to={id}>
        <p className={classes.author}>{author}</p>
        <p className={classes.text}>{body}</p>
      </Link>
    </div>
  )
}
