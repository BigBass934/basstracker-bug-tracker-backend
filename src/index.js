const app = require('./app');
const aws = require("aws-sdk");
aws.config.update({secretAccessKey: process.env.aws_secret_access_key,
  accessKeyId: process.env.aws_access_key_id,
  region: "us-east-2"})

console.log(process.env.aws_secret_access_key);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
