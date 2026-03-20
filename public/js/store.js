// ===============================
// GLOBAL STATE (mini store)
// ===============================

const Store = {

  state: {
    user: null,
    favoritos: []
  },

  listeners: [],

  set(key, value) {
    this.state[key] = value;
    this.notify();
  },

  get(key) {
    return this.state[key];
  },

  subscribe(fn) {
    this.listeners.push(fn);
  },

  notify() {
    this.listeners.forEach(fn => fn(this.state));
  }
};