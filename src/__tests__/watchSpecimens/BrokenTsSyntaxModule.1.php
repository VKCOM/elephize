<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class BrokenTsSyntaxModule extends CJSModule {
    /**
     * @var BrokenTsSyntaxModule $_mod
     */
    private static $_mod;
    public static function getInstance(): BrokenTsSyntaxModule {
        if (!self::$_mod) {
            self::$_mod = new BrokenTsSyntaxModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function btstest2($b) {
        $a = +$b;
        return $a;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->btstest2(1));
    }
}
