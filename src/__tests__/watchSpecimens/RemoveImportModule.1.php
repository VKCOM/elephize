<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class RemoveImportModule extends CJSModule {
    /**
     * @var RemoveImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): RemoveImportModule {
        if (!self::$_mod) {
            self::$_mod = new RemoveImportModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function inftest3($b) {
        return $b + 1;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->inftest3(1));
    }
}
