<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class SliceModule extends CJSModule {
    /**
     * @var SliceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): SliceModule {
        if (!self::$_mod) {
            self::$_mod = new SliceModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $a_sl
     */
    public $a_sl;
    /**
     * @var array $b_sl
     */
    public $b_sl;
    /**
     * @var array $c_sl
     */
    public $c_sl;
    /**
     * @var array $d_sl
     */
    public $d_sl;

    private function __construct() {
        $this->a_sl = [1, 2, 3];
        $this->b_sl = array_slice($this->a_sl, 0);
        $this->c_sl = array_slice($this->a_sl, 1);
        $this->d_sl = array_slice($this->a_sl, 1, count($this->a_sl) - 2 - 1);
        \VK\Elephize\Builtins\Console::log($this->b_sl, $this->c_sl, $this->d_sl);
    }
}
