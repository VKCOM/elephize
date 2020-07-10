<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ExportModule extends CJSModule {
    /**
     * @var ExportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ExportModule {
        if (!self::$_mod) {
            self::$_mod = new ExportModule();
        }
        return self::$_mod;
    }

    /**
     * @return float
     */
    public function test() {
        return 1 + 2;
    }
    /**
     * @var float $test2
     */
    public $test2;

    private function __construct() {
        $this->test2 = 1;
    }
}
