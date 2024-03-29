import { CommonjsModule } from './commonjsModule';
import { ModuleRegistry } from './moduleRegistry';
import { PhpParsedStruct } from './phpParser';
import * as path from 'path';
import { IReactModule } from '../../types';

export class ReactModule extends CommonjsModule implements IReactModule {
  public readonly isDerived: boolean = true;
  private _phpdoc: string[] = [];
  protected args: string;
  protected block: string;

  protected static _intrinsicReturnType = '';
  public static getIntrinsicReturnType(pathToModuleImpl: string) {
    if (!ReactModule._intrinsicReturnType) {
      const parser = new PhpParsedStruct(pathToModuleImpl);
      ReactModule._intrinsicReturnType = parser.getRetval('render') || 'mixed'; // Hardcoded function name
    }
    return ReactModule._intrinsicReturnType;
  }

  public setArgs(args: string) {
    // Support different var name for props:
    if (args === '') {
      args = '$props'; // Fallback: we should have props at out render method to comply with base class
      this._phpdoc = ['\t * @param mixed[] $props'];
    } else {
      this._phpdoc = args.split(', ').map((v) => `\t * @param mixed[] ${v}`);
      if (this._phpdoc.length > 1) {
        // We dont support react context
        this.log.error('React context is not supported (passed as 2nd argument)', [], this.log.shortCtx(this.sourceFileName));
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
    const fullyQualifiedNamespace = ModuleRegistry.pathToNamespace(this.targetFileName);
    const builtinIntrinsicFile = path.resolve(
      this.builtinsPath,
      'IntrinsicElement.php'
    );

    const renderRetval = ReactModule.getIntrinsicReturnType(builtinIntrinsicFile);
    return `<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace ${fullyQualifiedNamespace};
use ${this._namespaces.builtins}\\RenderableComponent;
use ${this._namespaces.builtins}\\Stdlib;

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
     * @param mixed[] $children
     * @return ${renderRetval === 'mixed' ? 'mixed' : renderRetval}
     */
    public function render(array ${this.args}, array $children) ${this.block}
}
`;
  }
}
