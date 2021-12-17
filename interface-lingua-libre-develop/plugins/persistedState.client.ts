import createPersistedState from 'vuex-persistedstate';

export default ({ store }: any) => {
  createPersistedState()(store);
};
