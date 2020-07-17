<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TrigonometryModule extends CJSModule {
    /**
     * @var TrigonometryModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TrigonometryModule {
        if (!self::$_mod) {
            self::$_mod = new TrigonometryModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $mt_src
     */
    public $mt_src;
    /**
     * @var float $mt_sin
     */
    public $mt_sin;
    /**
     * @var float $mt_cos
     */
    public $mt_cos;
    /**
     * @var float $mt_tan
     */
    public $mt_tan;
    /**
     * @var float $mt_asin
     */
    public $mt_asin;
    /**
     * @var float $mt_acos
     */
    public $mt_acos;
    /**
     * @var float $mt_atan
     */
    public $mt_atan;

    private function __construct() {
        $this->mt_src = -1.324545234;
        $this->mt_sin = sin($this->mt_src);
        $this->mt_cos = cos($this->mt_src);
        $this->mt_tan = tan($this->mt_src);
        $this->mt_asin = asin($this->mt_src);
        $this->mt_acos = acos($this->mt_src);
        $this->mt_atan = atan($this->mt_src);
        \VK\Elephize\Builtins\Console::log(
            $this->mt_sin,
            $this->mt_cos,
            $this->mt_tan,
            $this->mt_asin,
            $this->mt_acos,
            $this->mt_atan
        );
    }
}
