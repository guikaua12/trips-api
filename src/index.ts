import { server } from '@/shared/server/server';
import { connect } from '@/shared/database';
import { env } from '@/dotenv';

async function main() {
    await connect();

    server.listen(env.PORT, () => {
        console.log(`Servidor escutando na porta ${env.PORT}`);
    });
}

main();
