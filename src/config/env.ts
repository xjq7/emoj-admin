const development = {
  api: 'http://127.0.0.1:39001/v1',
};

const production = {
  api: 'https://api.xjq.icu/v1',
};
export default process.env.NODE_ENV === 'development' ? development : production;
