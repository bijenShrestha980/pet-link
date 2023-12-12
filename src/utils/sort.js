const sortBy = ({ key, currentItems, setCurrentItems }) => {
  let filterDataCopy = [...currentItems].sort(function (a, b) {
    if (a[key]?.toLowerCase() < b[key]?.toLowerCase()) {
      return -1;
    }
    if (a[key]?.toLowerCase() > b[key]?.toLowerCase()) {
      return 1;
    }
    if (a[key] === null || b[key] === null) {
      return -1;
    }
    return 0;
  });
  setCurrentItems(filterDataCopy);
};

export { sortBy };
