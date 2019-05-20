;(function () {
  window.toArray = toArray;

  function toArray(item) {
    return Array.prototype.slice.call(item);
  }
}());