import { makeAutoObservable } from 'mobx';
import { db } from '../firebase-config';
import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { authService } from '../auth/auth.service';
import { auth } from '../firebase-config';

class ViewsCounter {
  viewsCounter = 0;
  options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  constructor() {
    makeAutoObservable(this);
  }

  updateInfo = async (postID) => {
    const loginedUserUid = auth.currentUser.uid;
    const postRef = doc(db, 'posts', postID);
    updateDoc(postRef, { viewedBy: arrayUnion(loginedUserUid) });
  };

  consolidateInfo = (elements) => {
    elements.forEach((post) => {
      if (post.isIntersecting) {
        this.updateInfo(post.target.getAttribute('postid'));
      }
    });
  };

  makePostsObservable = (arr) => {
    if (!authService.isAuth) return;
    const observer = new IntersectionObserver(this.consolidateInfo, this.options);

    for (let element of arr) {
      if (element === null) return;
      observer.observe(element.ref?.current);
    }
  };
}

export const viewsCounter = new ViewsCounter();
