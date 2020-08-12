<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class BrokenTsTypingModule extends CJSModule {
    /**
     * @var BrokenTsTypingModule $_mod
     */
    private static $_mod;
    public static function getInstance(): BrokenTsTypingModule {
        if (!self::$_mod) {
            self::$_mod = new BrokenTsTypingModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function btttest2($b) {
        $a = 1 + $b;
        return $a;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->btttest2(1));
    }
}
