import Vue from 'vue';
import VueGtag from 'vue-gtag';

Vue.use(VueGtag, {
  // 在dev環境不使用ga
  enabled: !(process.env.NODE_ENV === 'development'),
  config: { id: 'G-TZS913C5SW' },
});
