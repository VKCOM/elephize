<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ReduceModule extends CJSModule {
    /**
     * @var ReduceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ReduceModule {
        if (!self::$_mod) {
            self::$_mod = new ReduceModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $ar
     */
    public $ar;
    /**
     * @var float $br
     */
    public $br;
    /**
     * @var float $dr
     */
    public $dr;
    /**
     * @var float $cr
     */
    public $cr;

    private function __construct() {
        $this->ar = [1, 2, 3];
        $this->br = array_reduce(
            $this->ar,
            /* _9f0b917 */ function ($acc, $el) {
                return $acc + $el;
            },
            10
        );
        $this->dr = array_reduce(
            $this->ar,
            /* _9aa5c73 */ function ($acc, $el) {
                return $acc + $el * $this->ar[0];
            },
            20
        );
        $this->cr = null;
        \VK\Elephize\Builtins\Console::log($this->br, $this->dr, $this->cr);
    }
}
