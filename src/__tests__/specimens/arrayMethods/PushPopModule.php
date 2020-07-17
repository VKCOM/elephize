<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class PushPopModule extends CJSModule {
    /**
     * @var PushPopModule $_mod
     */
    private static $_mod;
    public static function getInstance(): PushPopModule {
        if (!self::$_mod) {
            self::$_mod = new PushPopModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $a_st
     */
    public $a_st;
    /**
     * @var float $b_st
     */
    public $b_st;

    private function __construct() {
        $this->a_st = [1, 2, 3];
        array_push($this->a_st, 3);
        array_push($this->a_st, 1, 2, 3);
        $this->b_st = array_pop($this->a_st);
        \VK\Elephize\Builtins\Console::log($this->b_st);
    }
}
