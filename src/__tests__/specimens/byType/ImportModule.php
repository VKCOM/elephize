<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\byType;
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
        \VK\Elephize\src\__tests__\specimens\byType\ExportModule::getInstance()->test();
        \VK\Elephize\src\__tests__\specimens\byType\ExportModule::getInstance()->test();
        \VK\Elephize\src\__tests__\specimens\byType\ExportModule::getInstance()->test();
        $this->a = \VK\Elephize\src\__tests__\specimens\byType\ExportModule::getInstance()->test2;
        \VK\Elephize\Builtins\Console::log($this->a, $f);
    }
}
