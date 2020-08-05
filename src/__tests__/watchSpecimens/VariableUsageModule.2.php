<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class VariableUsageModule extends CJSModule {
    /**
     * @var VariableUsageModule $_mod
     */
    private static $_mod;
    public static function getInstance(): VariableUsageModule {
        if (!self::$_mod) {
            self::$_mod = new VariableUsageModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function vutest2($b) {
        $a = 1 + $b;
        return $a;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->vutest2(1));
    }
}
