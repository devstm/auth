import dev from './development';
import prod from './production';
import test from './test';

let config;
if (process.env.NODE_ENV === 'development') {
  config = dev;
} else if (process.env.NODE_ENV === 'production') {
  config = prod;
} else if (process.env.NODE_ENV === 'test') {
  config = test;
} else {
  config = dev;
}

export default config;
