<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class CustomIsomorphicsModule extends CJSModule {
    /**
     * @var CustomIsomorphicsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): CustomIsomorphicsModule {
        if (!self::$_mod) {
            self::$_mod = new CustomIsomorphicsModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $obj4
     */
    public $obj4;

    private function __construct() {
        $this->obj4 = [
            "a" => 1,
            "b" => 2,
        ];
        do {
            \VK\Elephize\Builtins\Console::log(CustomIso::getLang("lol!"));
            if ($this->obj4) {
                break;
            }
        } while (true);
    }
}
