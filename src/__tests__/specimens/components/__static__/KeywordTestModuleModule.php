<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\__static__;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class KeywordTestModuleModule extends CJSModule {
    /**
     * @var KeywordTestModuleModule $_mod
     */
    private static $_mod;
    public static function getInstance(): KeywordTestModuleModule {
        if (!self::$_mod) {
            self::$_mod = new KeywordTestModuleModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function KeywordTestModule() {
        return "test" . \VK\Elephize\Builtins\Date::now();
    }

    private function __construct() {
    }
}
