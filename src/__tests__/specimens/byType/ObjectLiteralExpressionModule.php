<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ObjectLiteralExpressionModule extends CJSModule {
    /**
     * @var ObjectLiteralExpressionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ObjectLiteralExpressionModule {
        if (!self::$_mod) {
            self::$_mod = new ObjectLiteralExpressionModule();
        }
        return self::$_mod;
    }

    public $e;

    private function __construct() {
        $this->e = [
            "a" => 123,
            "b" => 321,
            "c" => 222,
            "d" => "123",
        ];
        \VK\Elephize\Builtins\Console::log($this->e);
    }
}
