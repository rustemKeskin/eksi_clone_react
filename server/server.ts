const app = require('./app');
const config = require('./config/config');

const host = config.HOST as string;
const port = config.PORT as number;
const node_env = config.NODE_ENV as string;



//  server listen on port
app.listen(port, host,()=> {
  console.log(`[Server]: I am running at ${host} ${port} in ${node_env}`);
});
