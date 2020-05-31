const waitFor = (ms = 10) => new Promise(resolve => setTimeout(resolve, ms));

export {
  waitFor
};
