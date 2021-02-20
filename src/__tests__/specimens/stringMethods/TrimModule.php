<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\stringMethods;
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

    /**
     * @var string $atr
     */
    public $atr;
    /**
     * @var string $btr
     */
    public $btr;

    private function __construct() {
        $this->atr = " 12345 ";
        $this->btr = trim($this->atr);
        \VK\Elephize\Builtins\Console::log($this->btr);
    }
}
