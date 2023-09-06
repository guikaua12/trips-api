import { expect, test } from '@jest/globals';
import { init, tripRepository, tripReservationRepository, userRepository } from '@/shared/repositories/index';
import { pool } from '@/shared/database';

test('init should update the repositories variables', () => {
    expect(userRepository).toBeUndefined();
    expect(tripReservationRepository).toBeUndefined();
    expect(tripRepository).toBeUndefined();
    init(pool);
    expect(userRepository).toBeDefined();
    expect(tripReservationRepository).toBeDefined();
    expect(tripRepository).toBeDefined();
});
