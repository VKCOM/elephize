<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\misc;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/ToReplaceCjsWrapper.php';

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
            \VK\Elephize\Builtins\Console::log(
                \VK\Elephize\src\__tests__\specimens\misc\ToReplaceCjsWrapper::getInstance()->getLang("lol!")
            );
            \VK\Elephize\Builtins\Console::log(
                \VK\Elephize\src\__tests__\specimens\misc\ToReplaceCjsWrapper::getInstance()->getLangStatic("lol!")
            );
            if ($this->obj4) {
                break;
            }
        } while (true);
    }
}
