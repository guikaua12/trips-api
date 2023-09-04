import { test, expect, afterAll, beforeAll } from '@jest/globals';
import { init, userRepository } from '@/shared/repositories/index';
import { pool } from '@/shared/database';

test('init should update the repositories variables', () => {
    expect(userRepository).toBeUndefined();
    init(pool);
    expect(userRepository).toBeDefined();
});
