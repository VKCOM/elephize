<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;

class JsxModule extends CJSModule {
    /**
     * @var JsxModule $_mod
     */
    private static $_mod;
    public static function getInstance(): JsxModule {
        if (!self::$_mod) {
            self::$_mod = new JsxModule();
        }
        return self::$_mod;
    }

    private function __construct() {
    }
}
