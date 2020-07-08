<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class KeysModule extends CJSModule {
    /**
     * @var KeysModule $_mod
     */
    private static $_mod;
    public static function getInstance(): KeysModule {
        if (!self::$_mod) {
            self::$_mod = new KeysModule();
        }
        return self::$_mod;
    }

    public $ok;
    public $okkeys;

    private function __construct() {
        $this->ok = [
            1 => 123,
            "test" => 321,
            23 => 1111,
        ];
        $this->okkeys = array_keys($this->ok);
        \VK\Elephize\Builtins\Console::log($this->okkeys);
    }
}

