<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\misc;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TypecastModule extends CJSModule {
    /**
     * @var TypecastModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TypecastModule {
        if (!self::$_mod) {
            self::$_mod = new TypecastModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $tca
     */
    public $tca;
    /**
     * @var boolean $tcb
     */
    public $tcb;
    /**
     * @var float $tcc
     */
    public $tcc;
    /**
     * @var string $tcd
     */
    public $tcd;
    /**
     * @var float $tce
     */
    public $tce;

    private function __construct() {
        $this->tca = [1, 2, 84];
        $this->tcb = false;
        $this->tcc = 12;
        $this->tcd = "asdf";
        $this->tce = 1234.123;
        \VK\Elephize\Builtins\Console::log(
            (array) $this->tca,
            (bool) $this->tcb,
            (int) $this->tcc,
            (string) $this->tcd,
            (float) $this->tce
        );
    }
}
