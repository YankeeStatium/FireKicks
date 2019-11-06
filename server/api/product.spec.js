const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Product = db.model('product')
const agent = request.agent(app)

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/product', () => {
    const newShoe = {
      name: 'Running casual',
      brand: 'Nike',
      size: [6, 7, 8, 9],
      gender: 'Female',
      imageUrl: null
    }

    beforeEach(() => {
      return Product.create(newShoe)
    })

    it('GET /api/product', async () => {
      const res = await request(app)
        .get('/api/product')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].brand).to.be.equal('Nike')
    })
  })

  describe('GET /api/product/:id', () => {
    let shoe

    beforeEach(async () => {
      const newShoe = [
        {
          id: 1,
          name: 'Running casual',
          brand: 'Nike',
          size: [6, 7, 8, 9],
          gender: 'Female',
          imageUrl: null
        },
        {
          id: 2,
          name: 'Running formal',
          brand: 'Reebook',
          size: [6, 7, 8, 9],
          gender: 'Female',
          imageUrl: null
        },
        {
          id: 3,
          name: 'Just running',
          brand: 'Puma',
          size: [6, 7, 8, 9],
          gender: 'Female',
          imageUrl: null
        }
      ].map(data => Product.create(data))

      const createdShoe = await Promise.all(newShoe)
      shoe = createdShoe[1]
    })

    /**
     * This is a proper GET /product/ID request
     * where we search by the ID of the product created above
     */
    it('returns the JSON of the product based on the id', async () => {
      const res = await agent.get(`/api/product/${shoe.id}`).expect(200)
      if (typeof res.body === 'string') {
        res.body = JSON.parse(res.body)
      }
      expect(res.body.brand).to.equal('Reebook')
    })
  })

  // end describe('/api/product')
}) // end describe('All product routes')
