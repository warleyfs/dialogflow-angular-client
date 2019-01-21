// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  agents: {
    extensao: {
      authenticated: false,
      token: '5fc2dc9bba0c4c639f1f3217194e9644'
    },
    eac: {
      authenticated: true,
      token: '825ccbd4050848f2bb7172a3f3425457'
    },
    concurso: {
      authenticated: false,
      token: '8af1e52671dd491096e3c321d695c272'
    }
  }
};
