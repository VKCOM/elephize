<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\PathResolve;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;
use VK\Elephize\Builtins\ReactContextSynthetic;

class TsxModule extends CJSModule {
    /**
     * @var TsxModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TsxModule {
        if (!self::$_mod) {
            self::$_mod = new TsxModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function getTest() {
        return "test";
    }

    private function __construct() {
    }
}
