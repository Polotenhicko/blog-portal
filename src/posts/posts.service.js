import { makeObservable, observable, runInAction } from 'mobx';
import { FetchStore } from '../fetchStore';
import { commentsListService } from '../comments/CommentsList/commentsList.service';
import { RatingService } from '../home/PostItem/Rating/rating.service';

class PostsService {
  data = [];
  #route = '/posts';
  limit = 3;
  offset = {
    markerSec: 0,
    markerNanosec: 0,
  };
  postsEnded = false;
  isLoading = false;

  constructor() {
    makeObservable(this, {
      data: observable,
    });
  }

  deletePostItem = async (postId) => {
    const fetchClient = new FetchStore({
      route: this.#route,
      requiredAuth: true,
      params: { postId },
      method: 'DELETE',
    });
    await fetchClient.sendRequest();
    this.data = this.data.filter((post) => post.id !== postId);
  };

  resetPosts() {
    this.isLoading = false;
    this.postsEnded = false;
    this.offset = {
      markerSec: 0,
      markerNanosec: 0,
    };
    this.abortController?.abort();
    runInAction(() => (this.data = []));
  }

  addEmptyPosts() {
    const tempArr = [];
    for (let i = 0; i < this.limit; i++) {
      tempArr.push({ isLoading: true, id: this.data.length + i });
    }
    runInAction(() => this.data.push(...tempArr));
  }

  removeEmptyPosts() {
    runInAction(() => (this.data = this.data.filter((post) => !post.isLoading)));
  }

  async getAuthorPostsInfo(posts = [], signal) {
    const postsWithAuthorInfo = await commentsListService.getAuthorCommentsInfo(
      posts,
      signal
    );
    return postsWithAuthorInfo;
  }

  async getRatingPosts(posts = [], signal) {
    const ratingService = new RatingService();
    const ratingScorePromises = posts.map((post) =>
      ratingService.getAverageScore(post.id, signal)
    );
    const ratingScoreResults = await Promise.all(ratingScorePromises);
    posts.forEach((post, i) => {
      post.ratingScore = ratingScoreResults[i];
    });
    return posts;
  }

  async getFetchedPosts(requiredMinDelay) {
    const fetchClient = new FetchStore({
      route: this.#route,
      searchParams: {
        markerSec: this.offset.markerSec,
        markerNanosec: this.offset.markerNanosec,
        limit: this.limit,
      },
    });

    this.abortController = fetchClient.abortController;
    const fetchedResult = await fetchClient.sendRequest({ requiredMinDelay });

    const posts = fetchedResult.posts;
    posts.forEach((v) => (v.isLoading = false));

    return { fetchSignal: fetchClient.signal, fetchedResult, posts };
  }

  getPosts = async (requiredMinDelay) => {
    this.isLoading = true;
    this.addEmptyPosts();

    const { fetchSignal, fetchedResult, posts } = await this.getFetchedPosts(
      requiredMinDelay
    );

    await Promise.all([
      this.getAuthorPostsInfo(posts, this.abortController.signal),
      this.getRatingPosts(posts, this.abortController.signal),
    ]);

    const { offset, postsEnded } = fetchedResult;

    this.postsEnded = postsEnded;
    this.offset = {
      markerSec: offset.markerSec,
      markerNanosec: offset.markerNanosec,
    };

    this.removeEmptyPosts();
    this.isLoading = false;

    // не забыть
    void postsEnded;

    if (!fetchSignal.aborted) runInAction(() => this.data.push(...posts));
  };

  getSinglePost = async ({ id, requiredMinDelay, signal } = {}) => {
    const fetchClient = new FetchStore({
      route: this.#route,
      params: { id },
      signal,
    });
    const fetchedPost = await fetchClient.sendRequest({ requiredMinDelay });
    const arrWrap = [fetchedPost];
    await Promise.all([
      this.getAuthorPostsInfo(arrWrap, signal),
      this.getRatingPosts(arrWrap, signal),
    ]);

    const post = arrWrap[0];
    return post;
  };
}

export const postsService = new PostsService();
