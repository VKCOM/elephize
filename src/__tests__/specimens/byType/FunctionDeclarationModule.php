<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class FunctionDeclarationModule extends CJSModule {
    /**
     * @var FunctionDeclarationModule $_mod
     */
    private static $_mod;
    public static function getInstance(): FunctionDeclarationModule {
        if (!self::$_mod) {
            self::$_mod = new FunctionDeclarationModule();
        }
        return self::$_mod;
    }

    public function test1($b) {
        $a = 1 + $b;
        return $a;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->test1(1));
    }
}
