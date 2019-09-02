export const state = () => ({
  list: ["HOGEEEE", "PIYOOO"]
});

export const mutations = {
  add(state, object) {
    state.list.push(object);
  },
  remove(state, { layer }) {
    state.list.splice(state.list.indexOf(layer), 1);
  }
};
