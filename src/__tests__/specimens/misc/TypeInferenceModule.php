<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TypeInferenceModule extends CJSModule {
    /**
     * @var TypeInferenceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TypeInferenceModule {
        if (!self::$_mod) {
            self::$_mod = new TypeInferenceModule();
        }
        return self::$_mod;
    }

    /**
     * @var string|float $tyia
     */
    public $tyia;
    /**
     * @var float $tyib
     */
    public $tyib;
    /**
     * @var float|string $tyic
     */
    public $tyic;
    /**
     * @var int $tyid
     */
    public $tyid;
    /**
     * @var string|int $tyie
     */
    public $tyie;
    /**
     * @var int $tyif
     */
    public $tyif;
    /**
     * @var float $tyig
     */
    public $tyig;

    private function __construct() {
        $this->tyia = "123";
        $this->tyib = 1;
        $this->tyic = "2";
        $this->tyid = 3;
        $this->tyie = "32";
        $this->tyif = (int)"123";
        $this->tyig = (int) "123" + 456;
        \VK\Elephize\Builtins\Console::log(
            $this->tyia,
            $this->tyib,
            $this->tyic,
            $this->tyid,
            $this->tyie,
            $this->tyif,
            $this->tyig
        );
    }
}
