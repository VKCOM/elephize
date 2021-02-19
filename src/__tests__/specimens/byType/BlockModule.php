<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class BlockModule extends CJSModule {
    /**
     * @var BlockModule $_mod
     */
    private static $_mod;
    public static function getInstance(): BlockModule {
        if (!self::$_mod) {
            self::$_mod = new BlockModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $t1
     */
    public $t1;
    /**
     * @return float
     */
    public function t() {
        $aa = $this->t1 + 2;
        $bb = $aa + 1;
        return $bb;
    }

    private function __construct() {
        $this->t1 = 1;
        \VK\Elephize\Builtins\Console::log($this->t());
    }
}
