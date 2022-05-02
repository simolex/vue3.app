import { ref, computed } from "vue";

export function useSortedPosts(posts) {
  const selectedSort = ref("");
  const sortedPosts = computed(() => {
    if (selectedSort.value === "id") {
      return posts.value;
    } else {
      return [...posts.value].sort((post1, post2) => {
        return post1[selectedSort.value]?.localeCompare(post2[selectedSort.value]);
      });
    }
  });
  return {
    sortedPosts,
    selectedSort,
  };
}
