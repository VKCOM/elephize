<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ModifyFileTypehintsModule extends CJSModule {
    /**
     * @var ModifyFileTypehintsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ModifyFileTypehintsModule {
        if (!self::$_mod) {
            self::$_mod = new ModifyFileTypehintsModule();
        }
        return self::$_mod;
    }

    /**
     * @param mixed $a
     * @param float $b
     * @return string
     */
    public function mfttest($a, $b) {
        return (string) $a . (string) $b;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->mfttest(1, 3));
    }
}
