import { CommonjsModule } from './commonjsModule';
import { LogSeverity, shortCtx } from '../../utils/log';

export class ReactModule extends CommonjsModule {
  public readonly isDerived: boolean = true;
  private _phpdoc: string[] = [];
  protected args: string;
  protected block: string;

  public setArgs(args: string) {
    // Support different var name for props:
    if (args === '') {
      args = '$props'; // Fallback: we should have props at out render method to comply with base class
      this._phpdoc = ['\t * @param array $props'];
    } else {
      this._phpdoc = args.split(', ').map((v) => `\t * @param array ${v}`);
      if (this._phpdoc.length > 1) {
        // We dont support react context
        this.log('React context is not supported (passed as 2nd argument)', LogSeverity.ERROR, shortCtx(this.sourceFileName));
      }
    }
    this.args = args;
  }

  public setBlock(block: string) {
    this.block = block;
  }

  public isEmpty() {
    return false; // block is never empty
  }

  public generateContent() {
    return `<?php
/* NOTICE: Generated file; Do not edit by hand */
use ${this._namespaces.builtins}\\RenderableComponent;
use ${this._namespaces.builtins}\\IntrinsicElement;
use ${this._namespaces.builtins}\\Stdlib;

${this._getRequiredFiles()}

class ${this.className} extends RenderableComponent {
    /**
     * @var ${this.className} $_mod
     */
    private static $_mod;
    public static function getInstance(): ${this.className} {
        if (!self::$_mod) {
            self::$_mod = new ${this.className}();
        }
        return self::$_mod;
    }
    
    ${Array.from(this._hoistedContent.values()).join('\n')}
    
    private function __construct() {
        ${this._constructorStatements.join('\n')}
    }
    
    /**
    ${this._phpdoc.join('\n')}
     * @param array $children
     * @return string
     */
    public function render(array ${this.args}, array $children) ${this.block}
}
`;
  }
}
