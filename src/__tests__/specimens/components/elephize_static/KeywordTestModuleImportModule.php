<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\elephize_static;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;
use VK\Elephize\Builtins\ReactContextSynthetic;

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
        return \specimens\components\elephize_static\KeywordTestModuleModule::getInstance()->KeywordTestModule();
    }

    private function __construct() {
    }
}
