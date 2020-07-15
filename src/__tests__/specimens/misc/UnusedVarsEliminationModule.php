<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class UnusedVarsEliminationModule extends CJSModule {
    /**
     * @var UnusedVarsEliminationModule $_mod
     */
    private static $_mod;
    public static function getInstance(): UnusedVarsEliminationModule {
        if (!self::$_mod) {
            self::$_mod = new UnusedVarsEliminationModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $uv
     */
    public $uv;
    /**
     * @var float $uvctx
     */
    public $uvctx;
    /**
     * @return float
     */
    public function uvfun() {
        $a = $this->uvctx;
        $d = $a;
        \VK\Elephize\Builtins\Console::log($d);
        $g = $this->uvctx;
        return $g;
    }

    private function __construct() {
        $this->uv = 1;
        $this->uvctx = 1;
    }
}
