const {
  Products,
  styles,
  reviewsMetas,
  reviewsSchemas,
  questionsData,
} = require('./mongoSDCmodel.js');



const newProduct = {
    id: 40633,
    campus: 'rfp-pac',
    name: 'Nu Shooz',
    slogan: 'deez shooz!',
    description: 'oogity!',
    category: 'shoes',
    default_price: 40.50,
    created_at: Date.now(),
    updated_at: Date.now(),
    features: [
      {
        feature: 'Laces',
        value: 'Rawhide',
      },
    ],
}

Products.create(newProduct)
  .then((response) => {
    console.log(response)
  })
  .catch(console.log)