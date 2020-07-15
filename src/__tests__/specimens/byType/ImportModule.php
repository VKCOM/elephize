<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/ExportModule.php';

class ImportModule extends CJSModule {
    /**
     * @var ImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ImportModule {
        if (!self::$_mod) {
            self::$_mod = new ImportModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $a
     */
    public $a;

    private function __construct() {
        ExportModule::getInstance()->test();
        ExportModule::getInstance()->test();
        ExportModule::getInstance()->test();
        $this->a = ExportModule::getInstance()->test2;
        \VK\Elephize\Builtins\Console::log($this->a, $f);
    }
}
