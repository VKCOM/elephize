<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class BinaryExpressionModule extends CJSModule {
    /**
     * @var BinaryExpressionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): BinaryExpressionModule {
        if (!self::$_mod) {
            self::$_mod = new BinaryExpressionModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $a
     */
    public $a;

    private function __construct() {
        $this->a = 2 + 5;
        \VK\Elephize\Builtins\Console::log($this->a);
    }
}
