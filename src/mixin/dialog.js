export default {
  props: ['value', 'item'],
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
  watch: {
    value() {
      this.visible = this.value;
    },
  },
  mounted() {
    this.visible = this.value;
  },
};
