<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ComplexObjectFuncsModule extends CJSModule {
    /**
     * @var ComplexObjectFuncsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ComplexObjectFuncsModule {
        if (!self::$_mod) {
            self::$_mod = new ComplexObjectFuncsModule();
        }
        return self::$_mod;
    }

    /**
     * @param array $names
     * @return string
     */
    public function cls($names) {
        return implode(
            " ",
            array_filter(
                array_keys($names),
                /* _e8959da */ function ($name) use ($names) {
                    return $names[$name];
                }
            )
        );
    }

    private function __construct() {
    }
}
