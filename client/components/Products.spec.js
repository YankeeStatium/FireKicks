import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {Products} from './Products'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('Products', () => {
  let products
  let items = {
    products: [
      {
        name: 'Nike SB Zoom Stefan Janoski',
        brand: 'Nike',
        size: [9, 10, 10.5, 11, 11.5],
        gender: 'Male',
        imageUrl:
          'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/hjqejbfh0tkepd5fai04/sb-zoom-stefan-janoski-rm-skate-shoe-cJ66d1.jpg'
      }
    ]
  }

  beforeEach(() => {
    products = shallow(<Products products={items} />, {
      disableLifecycleMethods: true
    })
  })

  it('renders the name of the product in an h3 tag', () => {
    expect(
      products
        .find('h3')
        .text()
        .trim()
    ).to.be.equal('Nike SB Zoom Stefan Janoski')
  })
})
