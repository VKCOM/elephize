<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class FilterModule extends CJSModule {
    /**
     * @var FilterModule $_mod
     */
    private static $_mod;
    public static function getInstance(): FilterModule {
        if (!self::$_mod) {
            self::$_mod = new FilterModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $afl
     */
    public $afl;
    /**
     * @var array $bfl
     */
    public $bfl;
    /**
     * @var array $cfl
     */
    public $cfl;

    private function __construct() {
        $this->afl = [1, 2, 3];
        $this->bfl = array_filter(
            $this->afl,
            /* _dbfe777 */ function ($el) {
                return $el % 2;
            }
        );
        $this->cfl = null;
        \VK\Elephize\Builtins\Console::log($this->bfl, $this->cfl);
    }
}
