<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/enum/ValuesBasedEnum.php';

class EnumImportModule extends CJSModule {
    /**
     * @var EnumImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): EnumImportModule {
        if (!self::$_mod) {
            self::$_mod = new EnumImportModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $enut4
     */
    public $enut4;

    private function __construct() {
        $this->enut4 = \VK\Elephize\src\__tests__\specimens\byType\enum\ValuesBasedEnumEnum::LOL;
        \VK\Elephize\Builtins\Console::log($this->enut4);
    }
}
