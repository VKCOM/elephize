<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ComponentWithOuterFunctionModule extends CJSModule {
    /**
     * @var ComponentWithOuterFunctionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentWithOuterFunctionModule {
        if (!self::$_mod) {
            self::$_mod = new ComponentWithOuterFunctionModule();
        }
        return self::$_mod;
    }

    /**
     * @param string $classes
     * @return string
     */
    public function morePrepare($classes) {
        return implode("-", explode(" ", $classes));
    }
    /**
     * @param string $classes
     * @return string
     */
    public function prepareClasses($classes) {
        return implode(" ", explode(";", $classes));
    }

    private function __construct() {
    }
}
