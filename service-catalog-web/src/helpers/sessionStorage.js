export default class SessionStorage {
  setItem = (key, value) => {
    sessionStorage.setItem(key, value);
    return this;
  };

  getItem = (key) => sessionStorage.getItem(key);

  removeItem = (key) => {
    sessionStorage.removeItem(key);
    return this;
  };

  clearStorage = () => {
    sessionStorage.clear();
    return this;
  };
}
