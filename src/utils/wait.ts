const wait = (timeoutInMs: number) => {
  return new Promise((res) => {
    setTimeout(res, timeoutInMs);
  });
};


export default wait;