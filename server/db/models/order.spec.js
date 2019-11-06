/* global describe beforeEach it */

const {expect} = require('chai')
const db = require('../index')
const Order = db.model('order')

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('attributes definition', () => {
    let shoe = {
      name: 'Nike SB',
      brand: 'Nike',
      gender: 'Male'
    }
    let product

    beforeEach(async () => {
      product = await Product.create(shoe)
    })
    it('includes name and brand attributes', () => {
      expect(product.name).to.equal('Nike SB')
      expect(product.brand).to.equal('Nike')
    })

    it('requires `name`', async () => {
      product.name = null

      let result, error
      try {
        result = await product.validate()
      } catch (err) {
        error = err
      }

      if (result) throw Error('validation should fail when name is null')

      expect(error).to.be.an.instanceOf(Error)
    })
  }) // end describe('attributes definition)
}) // end describe('Product model')
