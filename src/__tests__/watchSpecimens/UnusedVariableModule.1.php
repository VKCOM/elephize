<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class UnusedVariableModule extends CJSModule {
    /**
     * @var UnusedVariableModule $_mod
     */
    private static $_mod;
    public static function getInstance(): UnusedVariableModule {
        if (!self::$_mod) {
            self::$_mod = new UnusedVariableModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function uvtest2($b) {
        $a = 1 + $b;
        return $a;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->uvtest2(1));
    }
}
