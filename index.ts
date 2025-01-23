import app from './app';
import config from './src/config/env';

const port = config.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

