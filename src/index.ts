import { server } from '@/shared/server/server';
import { connect, pool } from '@/shared/database';
import { env } from '@/dotenv';
import { UserRepository } from '@/modules/users/repositories/UserRepository';

async function main() {
    await connect();

    server.listen(env.PORT, () => {
        setInterval(async () => await new UserRepository(pool).count(), 1000 * 60 * 15);
    });
}

main();
