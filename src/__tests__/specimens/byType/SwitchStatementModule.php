<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class SwitchStatementModule extends CJSModule {
    /**
     * @var SwitchStatementModule $_mod
     */
    private static $_mod;
    public static function getInstance(): SwitchStatementModule {
        if (!self::$_mod) {
            self::$_mod = new SwitchStatementModule();
        }
        return self::$_mod;
    }

    public $as;

    private function __construct() {
        $this->as = 1;
        switch ($this->as) {
            case 1:
                \VK\Elephize\Builtins\Console::log("lol");
                break;
            case "1":
                \VK\Elephize\Builtins\Console::log("omg");
            case 2:
                \VK\Elephize\Builtins\Console::log("kek");
                break;
            default:
                \VK\Elephize\Builtins\Console::log("wow");
        }
    }
}
