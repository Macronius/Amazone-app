import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Marcus',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Fable',
            email: 'fable@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products:[
        {

            name: 'Roundtree & York Slim Shirt',
            category: 'Shirts',
            image: '../../images/p1.jpg',
            price: 80,
            countInStock: 12,
            brand: 'Roundtree & York',
            rating: 3,
            numReviews: 10,
            description: 'high quality Portuguese flannel',
        },
        {

            name: 'Ralph Lauren Polo',
            category: 'Shirts',
            image: '../../images/p2.jpg',
            price: 120,
            countInStock: 20,
            brand: 'Ralph Lauren',
            rating: 4.5,
            numReviews: 3,
            description: 'good',
        },
        {

            name: 'Lacoste',
            category: 'Shirts',
            image: '../../images/p3.jpg',
            price: 120,
            countInStock: 0,
            brand: 'Lacoste',
            rating: 3.5,
            numReviews: 4,
            description: 'high quality Portuguese flannel',
        },
        {

            name: 'Roundtree Chino',
            category: 'pants',
            image: '../../images/p4.jpg',
            price: 120,
            countInStock: 3,
            brand: 'Roundtree & York',
            rating: 1.5,
            numReviews: 2,
            description: 'high quality Portuguese flannel',
        },
        {

            name: 'Polo',
            category: 'pants',
            image: '../../images/p5.jpg',
            price: 85,
            countInStock: 17,
            brand: 'Polo',
            rating: 4.8,
            numReviews: 7,
            description: 'high quality Portuguese flannel',
        },
        {

            name: 'Original Penguin Chino',
            category: 'pants',
            image: '../../images/p6.jpg',
            price: 135,
            countInStock: 10,
            brand: 'Munsingwear',
            rating: 5,
            numReviews: 3,
            description: 'high quality Portuguese flannel',
        },
    ]
}

export default data;