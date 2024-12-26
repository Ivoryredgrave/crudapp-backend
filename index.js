import app from './src/app.js';
import { EnvConfig } from './src/config/env.config.js';

const { port } = EnvConfig();

app.listen(port, () => {
  console.log(`- Server running on port ${port}`);
});