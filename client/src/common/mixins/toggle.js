export const toggle = {
  data: function() {
    return {
      isShown: false,
    };
  },
  methods: {
    toggle() {
      this.isShown = !this.isShown;
    },
    show() {
      this.isShown = true;
    },
    close() {
      this.isShown = false;
    },
  },
};
