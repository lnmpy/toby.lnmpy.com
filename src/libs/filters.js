import Vue from 'vue';

Vue.filter('truncate', (value, length = 15) => {
  if (!value || typeof value !== 'string') return '';
  if (value.length <= length) return value;
  return value.substring(0, length) + '...';
});

