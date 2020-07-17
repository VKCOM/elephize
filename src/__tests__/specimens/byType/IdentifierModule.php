<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class IdentifierModule extends CJSModule {
    /**
     * @var IdentifierModule $_mod
     */
    private static $_mod;
    public static function getInstance(): IdentifierModule {
        if (!self::$_mod) {
            self::$_mod = new IdentifierModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $a1
     */
    public $a1;

    private function __construct() {
        $this->a1 = 1;
        \VK\Elephize\Builtins\Console::log($this->a1, $this->a1);
    }
}
