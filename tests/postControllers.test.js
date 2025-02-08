//! requerir el modelo
const {create, getAll, getById, getByTitle, updatePost, deletePost} = require('../controllers/postControllers');

// reiniciaremos los posts para garantizar la independencia de los test. 
beforeEach(() => {
    resetProducts();
});

describe('Create Post', () => {
    it('should create a Post', () => {
        create('titulotest', 'bodytest');
        expect(post[0]).toEqual({ title: 'titulotest', body: 'bodytest' });
    });
   
});