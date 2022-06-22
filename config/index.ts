import development from './development';

const env = process.env.NODE_ENV || 'development';
// // eslint-disable-next-line @typescript-eslint/no-var-requires
const { configuration } = require(`./${env}`);
const config = configuration || development;
export default config;
