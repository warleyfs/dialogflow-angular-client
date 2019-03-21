// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  agents: {
    chatbot: {
      authenticated: false,
      token: '7519c6d0c1d6474c984b8a420b44e42b'
    }
  }
};
