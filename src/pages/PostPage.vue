<template>
  <div class="posts">
    <h1>Страница с постами</h1>
    <ui-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="posts__buttons">
      <ui-button class="posts__list" @click="showDialog">
        Создать пост
      </ui-button>
      <ui-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <ui-dialog v-model:show="dialogVisible">
      <post-form @create="createPost" />
    </ui-dialog>
    <post-list
      :posts="sortedAndSearchedPosts"
      class="posts__list"
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка постов...</div>
    <div v-intersection="LoadLazyMorePosts" class="observer"></div>
    <!-- <div class="page__wrapper">
      <div class="paginator">
        <div
          class="paginator__page"
          v-for="page in totalPages"
          :key="page"
          :class="{ 'paginator__page--current': pageCurrent === page }"
          @click="changePage(page)"
        >
          {{ page }}
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],

      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: "",
      searchQuery: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "content", name: "По содержимому" },
        { value: "id", name: "По умолчанию" },
      ],
      pageCurrent: 1,
      limit: 10,
      totalPages: 0,
    };
  },
  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },
    removePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber) {
    //   this.pageCurrent = pageNumber;
    // },

    async fetchPosts() {
      this.isPostsLoading = true;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.pageCurrent,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = response.data.map(({ userId, id, title, body }) => ({
          userId,
          id,
          title,
          content: body,
        }));
      } catch (err) {
        alert("Error");
      } finally {
        this.isPostsLoading = false;
      }
    },
    async LoadLazyMorePosts() {
      this.pageCurrent++;
      try {
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts",
          {
            params: {
              _page: this.pageCurrent,
              _limit: this.limit,
            },
          }
        );
        this.totalPages = Math.ceil(
          response.headers["x-total-count"] / this.limit
        );
        this.posts = [
          ...this.posts,
          ...response.data.map(({ userId, id, title, body }) => ({
            userId,
            id,
            title,
            content: body,
          })),
        ];
      } catch (err) {
        alert("Error");
      }
    },
  },
  mounted() {
    this.fetchPosts();
  },
  watch: {
    // pageCurrent() {
    //   this.fetchPosts();
    // },
  },
  computed: {
    sortedPosts() {
      if (this.selectedSort === "id") {
        return this.posts;
      } else {
        return [...this.posts].sort((post1, post2) => {
          return post1[this.selectedSort]?.localeCompare(
            post2[this.selectedSort]
          );
        });
      }
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
};
</script>

<style lang="sass" scoped>
//$primary: teal

.posts
  display: flex
  flex-direction: column
  &__list
  &__buttons
    margin-top: 15px
    display: flex
    justify-content: space-between
    align-items: center
.page__wrapper
  margin-top: 15px
.paginator
  display: flex
  &__page
    cursor: pointer
    padding: 10px
    border: 1px solid $primary
  &--current
    background-color: $primary
    color: #fff
.observer
  height: 30px
  background-color: $primary
</style>


