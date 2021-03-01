<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\objectMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class HasOwnPropertyModule extends CJSModule {
    /**
     * @var HasOwnPropertyModule $_mod
     */
    private static $_mod;
    public static function getInstance(): HasOwnPropertyModule {
        if (!self::$_mod) {
            self::$_mod = new HasOwnPropertyModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $hopobj
     */
    public $hopobj;
    /**
     * @var boolean $hop
     */
    public $hop;

    private function __construct() {
        $this->hopobj = [
            1 => 123,
            "test" => 321,
            23 => 1111,
        ];
        $this->hop = array_key_exists("test", $this->hopobj);
        \VK\Elephize\Builtins\Console::log($this->hop);
    }
}
