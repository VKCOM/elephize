<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace watchSpecimens___;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class UndefVariableUsageModule extends CJSModule {
    /**
     * @var UndefVariableUsageModule $_mod
     */
    private static $_mod;
    public static function getInstance(): UndefVariableUsageModule {
        if (!self::$_mod) {
            self::$_mod = new UndefVariableUsageModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return mixed
     */
    public function uvutest2($b) {
        $a = 1 + $b;
        return $a + $c;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->uvutest2(1));
    }
}
