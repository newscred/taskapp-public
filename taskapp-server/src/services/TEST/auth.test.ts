import * as pg from '../pg';
import * as auth from '../auth';

describe('Auth service', () => {
  afterEach(async () => {
    const client = await pg.pgClient();
    await pg.query(client, 'TRUNCATE taskapp.users CASCADE;', {});
  });

  describe('createUser', () => {
    it('should create a user with given input and get back a user with an auth token', async () => {
      const input = {
        username: 'abcde',
        password: 'qwe90qwe',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin' as auth.Role,
      };
      const user = await auth.createUser(input);
      expect(user.id).toEqual(1);
      expect(user.authToken).not.toEqual(null);
    });

    it('should fail to create a user with the same username', async () => {
      const input = {
        username: 'abcde',
        password: 'qwe90qwe',
        firstName: 'John',
        lastName: 'Doe',
        role: 'admin' as auth.Role,
      };
      await auth.createUser(input);

      const createUser = async () => {
        await auth.createUser(input)
      }

      await expect(createUser).rejects.toThrow(
        auth.DuplicateUsernameError
      );
    });
  })
})
