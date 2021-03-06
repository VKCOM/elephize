<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class FindModule extends CJSModule {
    /**
     * @var FindModule $_mod
     */
    private static $_mod;
    public static function getInstance(): FindModule {
        if (!self::$_mod) {
            self::$_mod = new FindModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $aff
     */
    public $aff;
    /**
     * @var float $bff
     */
    public $bff;
    /**
     * @var float $cff
     */
    public $cff;

    private function __construct() {
        $this->aff = [1, 2, 3];
        $this->bff = Stdlib::arrayFind(
            $this->aff,
            /* _dbfe777 */ function ($el) {
                return $el % 2;
            }
        );
        $this->cff = Stdlib::arrayFind(
            $this->aff,
            /* _cc7ba3f */ function ($el, $idx) {
                return ($el * $idx) % 2;
            }
        );
        \VK\Elephize\Builtins\Console::log($this->bff, $this->cff);
    }
}
