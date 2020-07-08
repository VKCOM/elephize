<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TrimModule extends CJSModule {
    /**
     * @var TrimModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TrimModule {
        if (!self::$_mod) {
            self::$_mod = new TrimModule();
        }
        return self::$_mod;
    }

    public $atr;
    public $btr;

    private function __construct() {
        $this->atr = " 12345 ";
        $this->btr = trim($this->atr);
        \VK\Elephize\Builtins\Console::log($this->btr);
    }
}
