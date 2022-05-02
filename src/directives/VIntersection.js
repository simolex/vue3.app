export default {
  mounted(el, binding) {
    let options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    let callback = (entries, observer) => {
      entries.forEach((entry) => {
        // Each entry describes an intersection change for one observed
        // target element:
        //   entry.boundingClientRect
        //   entry.intersectionRatio
        //   entry.intersectionRect
        if (
          entry.isIntersecting
          //&& this.pageCurrent < this.totalPages
        ) {
          binding.value();
        }
        //   entry.rootBounds
        //   entry.target
        //   entry.time
      });
    };

    let observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  },
  name: "intersection",
};
