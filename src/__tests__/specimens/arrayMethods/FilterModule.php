<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;
use VK\Elephize\Builtins\ReactContextSynthetic;

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
     * @var float[] $afl
     */
    public $afl;
    /**
     * @var float[] $bfl
     */
    public $bfl;
    /**
     * @var float[] $cfl
     */
    public $cfl;

    private function __construct() {
        $this->afl = [1, 2, 3];
        $this->bfl = array_filter(
            $this->afl,
            /* anon_dbfe777 */ function ($el) {
                return $el % 2;
            }
        );
        $this->cfl = null;
        \VK\Elephize\Builtins\Console::log($this->bfl, $this->cfl);
    }
}
