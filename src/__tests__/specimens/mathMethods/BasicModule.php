<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\mathMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class BasicModule extends CJSModule {
    /**
     * @var BasicModule $_mod
     */
    private static $_mod;
    public static function getInstance(): BasicModule {
        if (!self::$_mod) {
            self::$_mod = new BasicModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $m_src
     */
    public $m_src;
    /**
     * @var float $m_abs
     */
    public $m_abs;
    /**
     * @var float $m_rnd
     */
    public $m_rnd;
    /**
     * @var float $m_flr
     */
    public $m_flr;
    /**
     * @var float $m_cl
     */
    public $m_cl;
    /**
     * @var float $m_rndm
     */
    public $m_rndm;
    /**
     * @var float $m_exp
     */
    public $m_exp;
    /**
     * @var float $m_log
     */
    public $m_log;
    /**
     * @var float $m_max
     */
    public $m_max;
    /**
     * @var float $m_min
     */
    public $m_min;
    /**
     * @var float $m_pow
     */
    public $m_pow;
    /**
     * @var float $m_sqrt
     */
    public $m_sqrt;
    /**
     * @var float $m_log2
     */
    public $m_log2;
    /**
     * @var float $m_log10
     */
    public $m_log10;

    private function __construct() {
        $this->m_src = -1.324545234;
        $this->m_abs = abs($this->m_src);
        $this->m_rnd = round($this->m_src);
        $this->m_flr = floor($this->m_src);
        $this->m_cl = ceil($this->m_src);
        $this->m_rndm = mt_rand(0, PHP_INT_MAX) / (float) PHP_INT_MAX;
        $this->m_exp = exp($this->m_src);
        $this->m_log = log($this->m_src);
        $this->m_max = max(1, 2, 3, 4);
        $this->m_min = min(1, 2, 3, 4);
        $this->m_pow = pow($this->m_src, $this->m_src);
        $this->m_sqrt = sqrt($this->m_src);
        $this->m_log2 = log($this->m_src, 2);
        $this->m_log10 = log($this->m_src, 10);
        \VK\Elephize\Builtins\Console::log(
            $this->m_abs,
            $this->m_rnd,
            $this->m_flr,
            $this->m_cl,
            $this->m_rndm,
            $this->m_exp,
            $this->m_log,
            $this->m_max,
            $this->m_min,
            $this->m_pow,
            $this->m_sqrt,
            $this->m_log2,
            $this->m_log10
        );
    }
}
