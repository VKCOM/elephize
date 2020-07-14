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

    private function __construct() {
        $this->tyia = "123";
        $this->tyib = 1;
        $this->tyic = "2";
        \VK\Elephize\Builtins\Console::log($this->tyia, $this->tyib, $this->tyic);
    }
}
