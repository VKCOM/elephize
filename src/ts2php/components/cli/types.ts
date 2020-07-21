export type Options = {
  config: string;
  src: string;
  outDir: string;
  output: string;
  quiet: boolean;
  verbose: boolean;
  verboseUsage: boolean;
  verboseTypehints: boolean;
  bail: 'none' | 'warn' | 'error';
  noZap: boolean;
  baseDir: string;
  help: boolean;
  encoding: string;
  aliases: { [key: string]: string };
  tsPaths: { [key: string]: string[] };
  rootNs: string;
};
