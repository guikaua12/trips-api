import { test, expect } from '@jest/globals';

test('final limit should be correct', () => {
    const limit = 10;
    const page_start = 2;
    const page_end = 8;

    const finalLimit = (page_end - (page_start - 1)) * limit;

    expect(finalLimit).toBe(70);
});
