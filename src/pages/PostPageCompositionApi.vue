<template>
  <div class="posts">
    <h1>Страница с постами</h1>
    <ui-input v-focus v-model="searchQuery" placeholder="Поиск..." />
    <div class="posts__buttons">
      <ui-button class="posts__list"> Создать пост </ui-button>
      <ui-select v-model="selectedSort" :options="sortOptions" />
    </div>

    <post-list
      :posts="sortedAndSearchedPosts"
      class="posts__list"
      v-if="!isPostsLoading"
    />
    <div v-else>Идет загрузка постов...</div>

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
import { usePosts } from "@/hooks/usePosts";
import { useSortedPosts } from "@/hooks/useSortedPosts";
import { useSortedAndSearchedPosts } from "@/hooks/useSortedAndSearchedPosts";

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "content", name: "По содержимому" },
        { value: "id", name: "По умолчанию" },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isPostsLoading } = usePosts(10);
    const { sortedPosts, selectedSort } = useSortedPosts(posts);
    const { searchQuery, sortedAndSearchedPosts } =
      useSortedAndSearchedPosts(sortedPosts);

    return {
      posts,
      totalPages,
      isPostsLoading,
      sortedPosts,
      selectedSort,
      searchQuery,
      sortedAndSearchedPosts,
    };
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


