<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class SpliceModule extends CJSModule {
    /**
     * @var SpliceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): SpliceModule {
        if (!self::$_mod) {
            self::$_mod = new SpliceModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $a_spl
     */
    public $a_spl;
    /**
     * @var array $b_spl
     */
    public $b_spl;
    /**
     * @var array $c_spl
     */
    public $c_spl;
    /**
     * @var array $d_spl
     */
    public $d_spl;
    /**
     * @var array $e_spl
     */
    public $e_spl;

    private function __construct() {
        $this->a_spl = [1, 2, 3];
        $this->b_spl = array_splice($this->a_spl, 1);
        $this->c_spl = array_splice($this->a_spl, 1, 1);
        $this->d_spl = array_splice($this->a_spl, 1, 0, [4, 5]);
        $this->e_spl = array_splice($this->a_spl, 1, 2, [4, 5, 6, 7]);
        \VK\Elephize\Builtins\Console::log($this->b_spl, $this->c_spl, $this->d_spl, $this->e_spl);
    }
}
