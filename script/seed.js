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
      'https://cdn1.shoebacca.com/catalog/product/3/6/368151-02_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'From the 1982 PUMA archive, Puma is bringing back a classic favorite with a fresh take. Known for his one-handed backhand and charming good looks, Argentinian tennis player Guillermo Vilas paired with PUMA to create a line of tennis shoes that matched his technique and style. The GV SPECIAL Lux is as iconic as the player himself with progressive updates to a timeless style.'
  },
  {
    name: 'Roma Basic',
    brand: 'Puma',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7500,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/3/5/353572-88_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'From the 1968 PUMA Archives, the Roma was a lightweight training shoe equipped with a thick, padded tongue and orthopedic arch supports. The Roma returns for the next generation with a smooth synthetic leather upper and clean look and feel.'
  },
  {
    name: 'Hoops Mid 2.0',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 11000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/F/3/F35101_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      "'These kids' basketball-inspired shoes have a synthetic nubuck upper and a textile lining to provide durable comfort for active feet. 3-Stripes and a rubber cupsole give the shoes classic hoops style"
  },
  {
    name: 'Busenitz Vulc Rx',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/B/Y/BY3980_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Pro Dennis Busenitz loves shredding in these oldies but goodies. These heritage sneakers are inspired by the iconic adidas Samba, and have been updated for a relentlessly fast, technically precise skating style. Made of leather with a suede-capped toe, the shoes have a close-fit collar to lock you in.'
  },
  {
    name: 'Court ff 2',
    brand: 'ASICS',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 12000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/0/1041A083-001_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      "Power your clay court game in the men's court ff™ tennis shoe by asics that is packed full of technical features to help you twist and jump for each ball. the shoe's flytefoam® midsole will help put a spring in your run while the trusstic system techonology reduces the weight of the sole unit while retaining the structural integrity of the shoe."
  },
  {
    name: 'Gel-Contend 5',
    brand: 'Adidas',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 4495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/0/1012A234-401_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Ideal For Low Mileage Runners, The Gel-contend 5 Shoe Features Exceptional Cushioning And A Dependable Fit. The Upper Features A Laminate Midcage To Provide Extra Support And Stability, While The Rearfoot Gel Technology Absorbs Shock On Impact. The Removable Ortholite Sockliner Ensures Your Feet Stay Comfortable And Dry All Day Long And Allows The Shoe To Accommodate Custom Orthotics.'
  },
  {
    name: 'Gel-Cumulus 20',
    brand: 'ASICS',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 6495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/0/1012A218-020_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'A Favorite For 20 Years And Counting. Gel-cumulus Celebrates Its 20th Anniversary With Premium Technology And A Refined Design That Offers Optimal Support And Comfort For Runners Of All Levels. A Flytefoam Midsole Teams Up With Rearfoot And Forefoot Gel Cushioning For A Smooth, Lightweight Ride That Maintains Full Contact With The Ground. Its Jacquard Mesh Upper Elevates The Styling And Forms To Your Foot For A Fit That Feels Customized Just For You.'
  },
  {
    name: '574 Essentials',
    brand: 'New Balance',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 6495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/W/L/WL574WND_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Created in 1988 by combining 2 different New Balance sneakers, the 574 has become a symbol of ingenuity and originality. No matter where you wear it, ENCAP technology with soft EVA cushioning in the midsole offers the support you need.'
  },
  {
    name: 'Suede TOL Embroidery',
    brand: 'Puma',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Women',
    price: 5495,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/3/7/370245-01_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'The PUMA Suede is the original game-changer that changes with the times but always stays classic. Since 1968, it has made a name for itself in all realms of culture- from the iconic Tommie Smith silent gesture at the 1968 Olympics to the peak of ‘80s hip hop culture and New York streetstyle. To this day, the Suede remains PUMA’s undisputed icon and has taken many different forms. This version features an embroidered floral print across the signature PUMA Formstrip for a stylish take on the classic.'
  },
  {
    name: 'N.92',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/173169-45041_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Low-cut trainer with upper in nylon and monochromatic PU leather. This richly detailed shoe features vivid colors and dynamic lines. A huge success in the early 1990s, this is the updated version of the N-92 shoe that replicates the shape, features and details of the original in a spellbinding, fashionable style.'
  },
  {
    name: 'Sirio Nyl',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/173712-40002_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Running as a lifestyle, placing one foot in front of the other straight through the latest trends: this is the passion at the heart of the Sirio Nyl. Its style is the result of blending two running shoes from the 1981 Diadora catalog, the Freestyle and the Orion: a unique upper-sole combination results in the Sirio Nyl.'
  },
  {
    name: 'Equipe H Canvas',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/174735-45066_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Equipe H Canvas Stone Wash is created in canvas and nubuck pigskin leather, while a stone wash treatment adds a classic touch.'
  },
  {
    name: 'N9000 MM EVO',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/172310-C0641_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'One Of The Most Iconic Diadora Models Is Given A Minimalist, Urban Twist For A Very Modern Look. Extremely Comfortable And Lightweight Thanks To The Seamless Construction Of The Upper And The Typical Cushioned Sole. N9000 Mm Evo. Stay One Step Ahead, With Style And Character.'
  },
  {
    name: 'N9000 H C SW',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/172779-60123_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      'Reference to the shape of the running shoe combines with attention to detail and the latest trends to create the new N9000. Its canvas upper is enhanced with leather details and a special stone-washed treatment while the model also features a leather insole, waxed laces and an external sole with EVA technology. The perfect shoe for an evening drink or work meeting, for those who want to make an impression while retaining a casual look.'
  },
  {
    name: 'B.Original H Suede',
    brand: 'Diadora',
    size: [9, 10, 10.5, 11, 11.5],
    gender: 'Men',
    price: 7000,
    imageUrl:
      'https://cdn1.shoebacca.com/catalog/product/1/7/174747-75068_1l.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=700&width=700&canvas=700:700',
    description:
      "Quality materials and simple lines make up the B.Original, a men's lifestyle model that perfectly showcases Diadora expertise. B. Original H Suede Stone Wash is a Heritage sneaker created in suede and complete with stone wash treatment. Featuring matching white logos on the sole, back and decoration."
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
