const stripe = require("stripe")("sk_test_51HLaoUFFN0Ux0kgLhtg3Acv4EqIlSPB5ka1x9eI8cut7pyjar3X9MFuvvr1P2WA1oNFLHFqtlA4BvropwlUa9Tfr00z7GwxJi4");
const uuid = require("uuid/v4");

exports.makepayment = (req, res) => {
  const { products, token } = req.body;
  //console.log("PRODUCTS", products);

  let amount = 0;
  products.map(p => {
    amount = amount + p.price;
  });
  const idempotencyKey = uuid();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id
    })
    .then(customer => {
      stripe.charges
        .create(
          {
            amount: amount * 100,
            currency: "inr",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the product`,
            shipping: {
              name: token.card.name,
              address: {
                line1: token.card.address_line1,
                line2: token.card.address_line2,
                city: token.card.address_city,
                country: token.card.address_country,
                postal_code: token.card.address_zip
              }
            }
          },
          {
            idempotencyKey
          }
        )
        .then(result => res.status(200).json(result))
        .catch(err => console.log(err));
    })
    .catch(console.log("FAILED"));
};