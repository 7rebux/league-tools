declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// Injected by webpack.plugins.js, true when the LCU is mocked in development
declare const MOCK_LCU: boolean;
