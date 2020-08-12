<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ElephizeAnnotationIgnoreImportedModule extends CJSModule {
    /**
     * @var ElephizeAnnotationIgnoreImportedModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ElephizeAnnotationIgnoreImportedModule {
        if (!self::$_mod) {
            self::$_mod = new ElephizeAnnotationIgnoreImportedModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function eaitest1($b) {
        return $b + 678;
    }

    private function __construct() {
    }
}
