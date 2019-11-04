const db = require('../server/db')

const {User, Product} = require('../server/db/models')

const users = [
  {
    email: 'mikemcmanus95@gmail.com',
    name: 'Michael',
    password: 'password',
    gender: 'Male',
    cart: []
  },
  {
    email: 'dennismcmanus95@gmail.com',
    name: 'Dennis',
    password: 'password',
    gender: 'Male',
    cart: []
  },
  {
    email: 'tausifsemail@gmail.com',
    name: 'Tausif',
    password: 'password',
    gender: 'Male',
    cart: []
  },
  {
    email: 'marcos@gmail.com',
    name: 'Marcos',
    password: 'password',
    gender: 'Male',
    cart: []
  },
  {
    email: 'linda@beautiful.com',
    name: 'Linda',
    password: 'password',
    gender: 'Female',
    cart: []
  }
]

const products = [
  {
    name: 'Nike SB Zoom Stefan Janoski',
    brand: 'Nike',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Male',
    imageUrl:
      'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/hjqejbfh0tkepd5fai04/sb-zoom-stefan-janoski-rm-skate-shoe-cJ66d1.jpg'
  },
  {
    name: 'Nike SB Zoom Stefan Janoski Slip Mid',
    brand: 'Nike',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Male',
    imageUrl:
      'https://c.static-nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/n4umox6et8keax9zx7dw/sb-zoom-stefan-janoski-slip-mid-rm-skate-shoe-63mLNx.jpg'
  },
  {
    name: 'NMD_R1 SHOES',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Male',
    imageUrl:
      'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/c730ce6803f7423ab9a3aa7900ebab2b_9366/NMD_R1_Shoes_Black_EE5107_01_standard.jpg'
  },
  {
    name: 'Continental 80 Shoes',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Male',
    imageUrl:
      'https://assets.adidas.com/images/w_840,h_840,f_auto,q_auto:sensitive,fl_lossy/8df5ab4346d7475ebb08a91500a047d3_9366/Continental_80_Shoes_White_G27706_01_standard.jpg'
  }
]

const seed = async () => {
  await db.sync({force: true})
  await Promise.all(
    users.map(user => {
      return User.create(user)
    }),
    products.map(product => {
      return Product.create(product)
    })
  )

  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('Oh noes! Something went wrong!')
  console.error(err)
  db.close()
})
