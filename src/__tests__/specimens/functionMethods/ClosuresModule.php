<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ClosuresModule extends CJSModule {
    /**
     * @var ClosuresModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ClosuresModule {
        if (!self::$_mod) {
            self::$_mod = new ClosuresModule();
        }
        return self::$_mod;
    }

    public function artest($b)
    {
        $called = 0;
        $nested = /* nested */ function ($c) use (/* !! MODIFIED INSIDE !! */ $called) {
            $called += $c;
            return $called;
        };
        $nested2 = /* nested2 */ function ($c) use ($called) {
            return $called + $c;
        };
        return $nested($b) + $nested2($b);
    }

    private function __construct()
    {
        \VK\Elephize\Builtins\Console::log($this->artest(1));
    }
}

