<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\watchSpecimens___;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/ImportNewFileToImportModule.php';

class ImportNewFileModule extends CJSModule {
    /**
     * @var ImportNewFileModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ImportNewFileModule {
        if (!self::$_mod) {
            self::$_mod = new ImportNewFileModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function inftest2($b) {
        return $b + 1;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->inftest2(1));
        \VK\Elephize\Builtins\Console::log(
            \VK\Elephize\src\__tests__\watchSpecimens___\ImportNewFileToImportModule::getInstance()->inftest1(1)
        );
    }
}
