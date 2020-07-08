<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class CallModule extends CJSModule {
    /**
     * @var CallModule $_mod
     */
    private static $_mod;
    public static function getInstance(): CallModule {
        if (!self::$_mod) {
            self::$_mod = new CallModule();
        }
        return self::$_mod;
    }

    public function sum3($arg1, $arg2, $arg3, $arg4) {
        return $arg1 + $arg2 + $arg3 + $arg4;
    }
    public $sum_curry;
    public $sum_curry2;

    private function __construct() {
        // TODO: remove and restrict? or what
        $this->sum_curry = \VK\Elephize\Builtins\Functional::bind([$this, 'sum3'], [2]);
        \VK\Elephize\Builtins\Console::log($this->sum_curry(...[2, 3, 4]));
        \VK\Elephize\Builtins\Console::log($this->sum_curry(...[2, 3, 4]));
        $sum_curry2 = \VK\Elephize\Builtins\Functional::bind($this->sum_curry, [3, 4]);
        \VK\Elephize\Builtins\Console::log($sum_curry2(...[4]));
        \VK\Elephize\Builtins\Console::log($sum_curry2(...[5]));
    }
}

