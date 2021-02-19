<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ImportNewFileToImportModule extends CJSModule {
    /**
     * @var ImportNewFileToImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ImportNewFileToImportModule {
        if (!self::$_mod) {
            self::$_mod = new ImportNewFileToImportModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function inftest1($b) {
        return $b + 1;
    }

    private function __construct() {
    }
}
