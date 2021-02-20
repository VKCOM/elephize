<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\stringMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ParseModule extends CJSModule {
    /**
     * @var ParseModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ParseModule {
        if (!self::$_mod) {
            self::$_mod = new ParseModule();
        }
        return self::$_mod;
    }

    /**
     * @var int $pria
     */
    public $pria;
    /**
     * @var int $prib
     */
    public $prib;
    /**
     * @var float $prfa
     */
    public $prfa;

    private function __construct() {
        $this->pria = (int) "123";
        $this->prib = intval("231", 16);
        $this->prfa = (float) "123.23";
        \VK\Elephize\Builtins\Console::log($this->pria, $this->prib, $this->prfa);
    }
}
