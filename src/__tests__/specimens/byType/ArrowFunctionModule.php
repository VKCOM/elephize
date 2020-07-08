<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ArrowFunctionModule extends CJSModule {
    /**
     * @var ArrowFunctionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ArrowFunctionModule {
        if (!self::$_mod) {
            self::$_mod = new ArrowFunctionModule();
        }
        return self::$_mod;
    }

    public function test2($b) {
        $a = 1 + $b;
        return $a;
    }
    public function test3($a, $b) {
        return $a + $b;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->test2(1));
        \VK\Elephize\Builtins\Console::log($this->test3(1, 2));
    }
}
