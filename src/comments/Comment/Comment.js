import { Component } from 'react';
import { Author } from '../../home/PostItem/Author';
import styles from './Comment.module.css';
import { CommentSkeleton } from './CommentSkeleton';
import { toJS } from 'mobx';

export class Comment extends Component {
  render() {
    const { commentData } = this.props;
    if (commentData.isLoading) return <CommentSkeleton />;
    return (
      <div className={styles.commentWrap}>
        <Author
          authorInfo={commentData.authorInfo}
          dateSec={commentData.date.seconds}
          isComment
        />
        <div className={styles.commentText}>{commentData.text}</div>
      </div>
    );
  }
}
