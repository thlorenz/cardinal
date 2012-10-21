function isPath (s) {
  return (/[\/\\]/).test(s);
}

module.exports = {
  isPath: isPath
};

