// tslint:disable:no-var-requires
const path = require('path');
const nodeFetch = require('node-fetch');
const fs = require('fs');
const util = require('util');
const childProcess = require("child_process");
const exec = util.promisify(childProcess.exec);

const graphQLEndpoint = process.env.REACT_APP_API_GRAPHQL_PATH;

if (!graphQLEndpoint) { throw Error("unexpected - must provide a graphql api path on environment") }

(async () => {
  const { stdout, stderr } = await exec(`apollo schema:download --endpoint=${graphQLEndpoint} src/graphql/schema.json`);
  console.log(stdout);
  console.warn(stderr);

  try {
    const result = (await (await nodeFetch(graphQLEndpoint, {
      body: JSON.stringify({
        query: `
        {
          __schema {
            types {
              kind
              name
              possibleTypes {
                name
              }
            }
          }
        }
      `,
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST'
    })).json());

    // here we're filtering out any type information unrelated to unions or interfaces
      result.data.__schema.types = result.data.__schema.types.filter(
        type => type.possibleTypes !== null,
    );
    fs.writeFile(path.join(__dirname, '../src/graphql', 'fragmentTypes.json'), JSON.stringify(result.data), err => {
      if (err) {
        console.error('Error writing fragmentTypes file', err);
      } else {
        console.log('Fragment types successfully extracted!');
      }
    });
  } catch (err) {
    console.error(err);
  }
})();

