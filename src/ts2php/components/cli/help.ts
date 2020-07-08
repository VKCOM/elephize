import { Options } from './types';

export function help(options: Options) {
  if (options.help) {
    console.log(`Elephize: ts/react -> php transpiler
Options:
   -h / --help                   Show this help
   -c / --config FILE            Determine path and name of configuration
                                 file, defaults to .elephizerc.
   -s / --src '*.ts'             Define which files should be processed.
                                 Accepts quoted glob string.
   -o / --output FILE            Define output bootstrap file name. If a file
                                 already exists, it's contents will be
                                 overwritten. If not specified, will output
                                 bootstrap contents to stdout.
   -d / --outDir DIR             Define directory path where all generated
                                 php files will be placed.
   -l / --encoding ENC           Set encoding for output files. Useful when
                                 your server uses non-utf encoding.
   -q / --quiet                  Do not show error messages from transpiler
                                 and analyzer.
   -b / --baseDir DIR            Base src directory for transpiled code for 
                                 relative paths resolution.
   -e / --bail none|warn|error   Return error code if warning/error occurred
                                 during transpilation. Defaults to none.
   -n / --rootNs NAME            Root namespace name for generated classes.
   -z / --noZap                  Do not remove unused variables from resulting
                                 code. May be useful for debug.
   -v / --verbose                Show more verbose output from transpiler.
   -u / --verboseUsage           Show var usage stats & unused code eliminator
                                 verbose output. May be useful for debug.
                                 Will print out A LOT of everything, be careful.
   
Config-only options:
   tsPaths: { "shortcut": ["array_of_paths"] }
       Specify path alias. This should match pathes in your tsconfig.json. Also
       if you use webpack, these paths should be processed in your webpack config.
   aliases: { "alias": "other_path" }
       Specify target directory aliases for the case you don't want to strictly match
       your output directory structure to input.
`);
    process.exit(0);
  }
}