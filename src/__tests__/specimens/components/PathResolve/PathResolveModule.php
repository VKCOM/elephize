<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\PathResolve;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class PathResolveModule extends CJSModule {
    /**
     * @var PathResolveModule $_mod
     */
    private static $_mod;
    public static function getInstance(): PathResolveModule {
        if (!self::$_mod) {
            self::$_mod = new PathResolveModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function getBar() {
        return "bar";
    }

    private function __construct() {
        \specimens\components\PathResolve\HelpersModule::getInstance()->getFoo();
    }
}
