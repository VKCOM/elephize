<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ReexportResolveModule extends CJSModule {
    /**
     * @var ReexportResolveModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ReexportResolveModule {
        if (!self::$_mod) {
            self::$_mod = new ReexportResolveModule();
        }
        return self::$_mod;
    }

    private function __construct() {
        \specimens\components\PathResolve\HelpersModule::getInstance()->getFoo();
        \specimens\components\PathResolve\HelpersModule::getInstance()->getFoo2();
        \specimens\components\PathResolve\HelpersModule::getInstance()->getFoo3();
        \specimens\components\PathResolve\PathResolveModule::getInstance()->getBar();
        \VK\Elephize\Builtins\Console::log(
            \specimens\components\PathResolve\PathResolveModule::getInstance()->SOME_CONST
        );
    }
}
