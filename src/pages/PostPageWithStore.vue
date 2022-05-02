<template>
  <div class="posts">
    <h1>Страница с постами</h1>
    <ui-input
      v-focus
      model-value="searchQuery"
      @update:model-value="setSearchQuery"
      placeholder="Поиск..."
    />
    <div class="posts__buttons">
      <ui-button class="posts__list" @click="showDialog">
        Создать пост
      </ui-button>
      <ui-select
        model-value="selectedSort"
        @update:model-value="setSelectedSort"
        :options="sortOptions"
      />
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
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },
  methods: {
    ...mapMutations({
      setPageCurrent: "post/setPageCurrent",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),
    ...mapActions({
      LoadLazyMorePosts: "post/LoadLazyMorePosts",
      fetchPosts: "post/fetchPosts",
    }),
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
    ...mapState({
      posts: (state) => state.post.posts,
      sortOptions: (state) => state.post.sortOptions,
      isPostsLoading: (state) => state.post.isPostsLoading,
      selectedSort: (state) => state.post.selectedSort,
      searchQuery: (state) => state.post.searchQuery,
      pageCurrent: (state) => state.post.pageCurrent,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
    }),
    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
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


