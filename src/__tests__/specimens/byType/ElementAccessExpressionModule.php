<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ElementAccessExpressionModule extends CJSModule {
    /**
     * @var ElementAccessExpressionModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ElementAccessExpressionModule {
        if (!self::$_mod) {
            self::$_mod = new ElementAccessExpressionModule();
        }
        return self::$_mod;
    }

    public $b;
    public $d;

    private function __construct() {
        $this->b = [1, 2, 3];
        $this->d = $this->b[1];
        \VK\Elephize\Builtins\Console::log($this->d);
    }
}
