<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\__static__;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/KeywordTestComponent/KeywordTestComponent.php';

class KeywordTestComponentImportModule extends CJSModule {
    /**
     * @var KeywordTestComponentImportModule $_mod
     */
    private static $_mod;
    public static function getInstance(): KeywordTestComponentImportModule {
        if (!self::$_mod) {
            self::$_mod = new KeywordTestComponentImportModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function KeywordTestComponentImport() {
        return \VK\Elephize\src\__tests__\specimens\components\__static__\KeywordTestComponent\KeywordTestComponent::getInstance()->render(
            [],
            []
        );
    }

    private function __construct() {
    }
}
