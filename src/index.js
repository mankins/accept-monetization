const marked = require('marked');
const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.static('static'));
app.use('/static', express.static('static')); // github readme compat
app.use(express.json());

const { parse, parseValue } = require('parse-accepts');

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const index = fs.readFileSync('./readme.md').toString();
  const html = marked(index);
  res.send(page(html));
});

app.all('/headers', async (req, res) => {
  const { headers } = req;
  res.send({ headers });
});

app.all('/accept-payment', async (req, res) => {
  const { headers } = req;
  const acceptPayment = headers['accept-payment'] || '';

  if (acceptPayment) {
    const parsed = parse(acceptPayment);
    res.send({ parsed });
    return;
  } else {
    res.send(`<h1>Missing Payment Header</h1>
      
      <a href="/headers">Inspect headers</a>
      `);
  }
});

app.all('/ads/required', async (req, res) => {
  const { headers } = req;
  const acceptPayment = headers['accept-payment'] || '';

  const lookingFor = 'ads';

  const parsed = parse(acceptPayment) || [];
  let found = false;
  parsed.forEach((type) => {
    if (type.value && type.value.indexOf(lookingFor) !== -1) {
      if (type.quality) {
        found = true;
      }
    }
  });
  if (found) {
    res.send(page('Ok, method found'));
    return;
  }

  res.status(402);
  res.send(
    page(
      '<h1>Missing Payment: 402 Payment Required</h1><p>Accept-payment: ads/* not found</p>',
    ),
  );
});

app.all('/webmon/required', async (req, res) => {
  const { headers } = req;
  const acceptPayment = headers['accept-payment'] || '';

  const lookingFor = 'webmon';

  const parsed = parse(acceptPayment) || [];
  let found = false;
  parsed.forEach((type) => {
    if (type.value && type.value.indexOf(lookingFor) !== -1) {
      if (type.quality) {
        found = true;
      }
    }
  });
  if (found) {
    res.send(page('Ok, method found'));
    return;
  }

  res.status(402);
  res.send(
    page(
      '<h1>Missing Payment: 402 Payment Required</h1><p>Accept-payment: webmon/* not found</p>',
    ),
  );
});

const page = (body) => {
  return `${body}
    <h2>Pages</h2>
          <ul>
       <li><a href="/headers">Inspect headers</a></li>
       <li><a href="/accept-payment">Parse Accept-Payment</a></li>
       <li><a href="/webmon/required">Look for Web Monetization</a></li>
       <li><a href="/ads/required">Look for Ads</a></li>
       <li><a href="/">Overview</a></li>
      </ul>`;
};

app.all('/', (req, res) => {
  const { headers } = req;

  if (headers['accept-payment']) {
    res.send(page('<h1>Payment Accept Header Found. Ok.</h1>'));
  } else {
    res.status(402);
    res.send(page('<h1>Missing Payment: 402 Payment Required</h1>'));
  }
});

app.listen(PORT, () => {
  console.log(`accept-payment on http://localhost:${PORT}/`);
});
