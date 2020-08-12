<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/ElephizeAnnotationIgnoreImportedModule.php';

class ElephizeAnnotationIgnoreModule extends CJSModule {
    /**
     * @var ElephizeAnnotationIgnoreModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ElephizeAnnotationIgnoreModule {
        if (!self::$_mod) {
            self::$_mod = new ElephizeAnnotationIgnoreModule();
        }
        return self::$_mod;
    }

    /**
     * @param float $b
     * @return float
     */
    public function eaitest2($b) {
        return $b + 1;
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log($this->eaitest2(1));
        \VK\Elephize\Builtins\Console::log(ElephizeAnnotationIgnoreImportedModule::getInstance()->eaitest1(1));
    }
}
