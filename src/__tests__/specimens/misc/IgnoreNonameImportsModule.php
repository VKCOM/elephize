<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class IgnoreNonameImportsModule extends CJSModule {
    /**
     * @var IgnoreNonameImportsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): IgnoreNonameImportsModule {
        if (!self::$_mod) {
            self::$_mod = new IgnoreNonameImportsModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $ini1
     */
    public $ini1;

    private function __construct() {
        $this->ini1 = "123";
    }
}
