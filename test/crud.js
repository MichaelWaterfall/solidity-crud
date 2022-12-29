const Crud = artifacts.require('Crud');

contract('Crud', () => {
    let crud = null;
    before(async() => {
        crud = await Crud.deployed();
    });

    it('should create a new user', async () => {
        await crud.create('Frank');
        const user = await crud.read(1)
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Frank');
    })

    it('should update a user', async () => {
        await crud.update(1, 'Bob');
        const user = await crud.read(1);
        assert(user[0].toNumber() === 1);
        assert(user[1] === 'Bob');
    })

    it('should NOT update a non-existing user', async () => {
        try {
            await crud.update(2, 'Michael');
        } catch (error) {
            assert(error.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    })

    it('should destroy a user', async () => {
        await crud.destroy(1);
        try {
            await crud.read(1);
        } catch (error) {
            assert(error.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    })

    it('should NOT destroy a non-existing user', async () => {
        try {
            await crud.destroy(10);
        } catch (error) {
            assert(error.message.includes('User does not exist!'));
            return;
        }
        assert(false);
    })
})