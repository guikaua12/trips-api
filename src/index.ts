import { server } from '@/shared/server/server';
import { connect } from '@/shared/database';

require('dotenv').config();
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env.test' });

async function main() {
    await connect();

    const port = process.env.PORT || 2000;
    server.listen(port, () => {
        console.log(`Servidor escutando na porta ${port}`);
    });
}

main();
