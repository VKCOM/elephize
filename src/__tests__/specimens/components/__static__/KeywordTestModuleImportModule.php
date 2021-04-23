<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\__static__;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/KeywordTestModuleModule.php';

class KeywordTestModuleImportModule extends CJSModule {
    /**
     * @var KeywordTestModuleImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): KeywordTestModuleImportModule {
        if (!self::$_mod) {
            self::$_mod = new KeywordTestModuleImportModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function KeywordTestModuleImport() {
        return \VK\Elephize\src\__tests__\specimens\components\__static__\KeywordTestModuleModule::getInstance()->KeywordTestModule();
    }

    private function __construct() {
    }
}
