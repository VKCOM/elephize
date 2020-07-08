<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ComponentWithOuterFunctionModule extends CJSModule
{
    /**
     * @var ComponentWithOuterFunctionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentWithOuterFunctionModule
    {
        if (!self::$_mod) {
            self::$_mod = new ComponentWithOuterFunctionModule();
        }
        return self::$_mod;
    }

    public function prepareClasses($classes)
    {
        return implode(" ", explode(";", $classes));
    }
    public function morePrepare($classes)
    {
        return implode("-", explode(" ", $classes));
    }

    private function __construct() {
    }
}
