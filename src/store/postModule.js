import axios from "axios";

export const postModule = {
  state: () => ({
    sortOptions: [
      { value: "title", name: "По названию" },
      { value: "content", name: "По содержимому" },
      { value: "id", name: "По умолчанию" },
    ],
    posts: [],
    isPostsLoading: false,
    selectedSort: "",
    searchQuery: "",
    pageCurrent: 1,
    limit: 10,
    totalPages: 0,
  }),
  getters: {
    sortedPosts(state) {
      if (state.selectedSort === "id") {
        return state.posts;
      } else {
        return [...state.posts].sort((post1, post2) => {
          return post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]);
        });
      }
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) => post.title.toLowerCase().includes(state.searchQuery.toLowerCase()));
    },
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setLoading(state, bool) {
      state.isPostsLoading = bool;
    },
    setPageCurrent(state, page) {
      state.pageCurrent = page;
    },
    setLimit(state, limit) {
      state.limit = limit;
    },
    setSelectedSort(state, sort) {
      state.selectedSort = sort;
    },
    setTotalPages(state, total) {
      state.totalPages = total;
    },
    setSearchQuery(state, query) {
      state.searchQuery = query;
    },
    setSortOptions(state, options) {
      state.sortOptions = options;
    },
  },
  actions: {
    async fetchPosts({ state, commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: state.pageCurrent,
            _limit: state.limit,
          },
        });
        commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
        commit(
          "setPosts",
          response.data.map(({ userId, id, title, body }) => ({
            userId,
            id,
            title,
            content: body,
          }))
        );
      } catch (err) {
        alert("Error");
      } finally {
        commit("setLoading", false);
      }
    },
    async LoadLazyMorePosts({ state, commit }) {
      commit("setPageCurrent", state.pageCurrent + 1);
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
          params: {
            _page: state.pageCurrent,
            _limit: state.limit,
          },
        });
        commit("setTotalPages", Math.ceil(response.headers["x-total-count"] / state.limit));
        commit("setPosts", [
          ...state.posts,
          ...response.data.map(({ userId, id, title, body }) => ({
            userId,
            id,
            title,
            content: body,
          })),
        ]);
      } catch (err) {
        alert("Error");
      }
    },
  },
  namespaced: true,
};
