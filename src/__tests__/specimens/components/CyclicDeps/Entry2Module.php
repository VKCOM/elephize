<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\CyclicDeps;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class Entry2Module extends CJSModule {
    /**
     * @var Entry2Module $_mod
     */
    private static $_mod;
    public static function getInstance(): Entry2Module {
        if (!self::$_mod) {
            self::$_mod = new Entry2Module();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function getCyclicEntry2() {
        return "1";
    }
    /**
     * @return mixed
     */
    public function getCyclicEntry3() {
        return null;
    }

    private function __construct() {
    }
}