const express = require("express");
const app = express();
app.use(express.static("static"));
app.use(express.json());

const { parse, parseValue } = require("parse-accepts");


const PORT = process.env.PORT || 3000;

app.all("/headers", async (req, res) => {
  const { headers } = req;
  res.send({headers});
});

app.all("/accept-payment", async (req, res) => {
  const { headers } = req;
  const acceptPayment = headers['accept-payment'] || '';

    if (acceptPayment) {
  const parsed = parse(acceptPayment);
res.send({parsed});
return;
    } else {
      res.send(`<h1>Missing Payment Header</h1>
      
      <a href="/headers">Inspect headers</a>
      `);

    }
});


app.all("/crazypass/required", async (req, res) => {
  const { headers } = req;
  const acceptPayment = headers['accept-payment'] || '';

   const lookingFor = 'crazypass';

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
res.send('Ok, method found');
return;
  }

    fourOhTwo(req, res);  
});

app.all("/webmon/required", async (req, res) => {
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
res.send('Ok, method found');
return;
  }

    fourOhTwo(req, res);  
});


app.all("/", async (req, res) => {
  const { headers } = req;

  if (headers['accept-payment']) {
      res.send(`<h1>Payment Accepted</h1>
      
      <a href="/headers">Inspect headers</a>
      <a href="/accept-payment">Parse Accept-Payment</a>
      `);
      return;
  } else {
      await fourOhTwo(req, res);
  }
});

const fourOhTwo = (req, res) => {
      res.status(402);
      res.send(`<h1>Missing Payment: 402 Payment Required</h1>
      
      <a href="/headers">Inspect headers</a>
      <a href="/accept-payment">Parse Accept-Payment</a>
      `);
};

 app.listen(PORT, () => {
     console.log(`accept-payment on ${PORT}`);
 });