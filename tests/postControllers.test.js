//! requerir el modelo

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
require('dotenv').config();
const Post = require('../models/Post'); // importar el modelo para crear nuevos posts

// conecta a ddbb antes de ejecutar los tests.
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});
//cerrar la conexion de la ddbb despues del test
afterAll(async () => {
    await mongoose.connection.close();
});

describe('POST /create', () => {
    it('should create a new post', async () => {
        const newPost = {
            title: 'Nueva Publicación',
            body: 'Este es el contenido de la nueva publicación.'
        };

        const response = await request(app).post('/create').send(newPost);

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('_id');
        
    });

    it('should throw an error if title or body are null', async () => {
        const newPost = {
            title: 'Nueva Publicación'
        };

        const response = await request(app).post('/create').send(newPost);

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('error', 'Title and body are required');
    });
});

describe('GET /posts', () => {
    beforeAll(async () => {
        await Post.deleteMany(); 
    });

    it('should return all the posts', async () => {
        await Post.create({
            title: 'Nueva Publicación',
            body: 'Este es el contenido de la nueva publicación.'
        });

        await Post.create({
            title: 'Nueva Publicación2',
            body: 'Este es el contenido de la nueva publicación2.'
        });

        const response = await request(app).get('/posts');

        expect(response.statusCode).toBe(200);

        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toHaveLength(2);
    });

    afterAll(async () => {
        await mongoose.connection.close(); 
    });
});
