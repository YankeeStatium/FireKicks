const db = require('../server/db')

const {User, Product, Order} = require('../server/db/models')

const users = [
  {
    email: 'mikemcmanus95@gmail.com',
    name: 'Michael',
    password: 'password',
    gender: 'Male'
  },
  {
    email: 'dennismcmanus95@gmail.com',
    name: 'Dennis',
    password: 'password',
    gender: 'Male'
  },
  {
    email: 'tausifsemail@gmail.com',
    name: 'Tausif',
    password: 'password',
    gender: 'Male'
  },
  {
    email: 'marcos@gmail.com',
    name: 'Marcos',
    password: 'password',
    gender: 'Male'
  },
  {
    email: 'linda@beautiful.com',
    name: 'Linda',
    password: 'password',
    gender: 'Female'
  }
]

const products = [
  {
    name: 'GV Special Lux',
    brand: 'Puma',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 6000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/3/6/368151-02_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Roma Basic',
    brand: 'Puma',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7500,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/3/5/353572-88_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Hoops Mid 2.0',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 11000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/F/3/F35101_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Busenitz Vulc Rx',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/B/Y/BY3980_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'court ff 2',
    brand: 'ASICS',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 12000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/0/1041A083-001_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Gel-Contend 5',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 4495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/0/1012A234-401_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Gel-Cumulus 20',
    brand: 'ASICS',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 6495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/0/1012A218-020_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: '574 Essentials',
    brand: 'New Balance',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 6495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/W/L/WL574WND_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Suede TOL Embroidery',
    brand: 'Puma',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 5495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/3/7/370245-01_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'N.92',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/173169-45041_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Sirio Nyl',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/173712-40002_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'Equipe H Canvas',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/174735-45066_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'N9000 MM EVO',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/172310-C0641_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'N9000 H C SW',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/172779-60123_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
  },
  {
    name: 'B.Original H Suede',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/174747-75068_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700'
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

  const user = await User.findByPk(2)

  const order = await user.createOrder()

  let product = await Product.findByPk(2)

  await order.addProduct(product)

  product = await Product.findByPk(3)
  await order.addProduct(product)

  console.log('Seeding success!')
  db.close()
}

seed().catch(err => {
  console.error('Oh noes! Something went wrong!')
  console.error(err)
  db.close()
})
