const o = {
  name: 'abcd',
  age: 42
};

fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(o)
})
  .then(res => { console.log(res); });
