import { server } from './shared/server/server';
import { connect, client } from '../build/shared/database';
require('dotenv').config();

async function main() {
    await connect();

    const port = process.env.port;
    server.listen(port, () => {
        console.log(`Servidor escutando na porta ${port}`);
    });
}

main();
