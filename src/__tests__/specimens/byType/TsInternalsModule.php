<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TsInternalsModule extends CJSModule {
    /**
     * @var TsInternalsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TsInternalsModule {
        if (!self::$_mod) {
            self::$_mod = new TsInternalsModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $tia
     */
    public $tia;
    /**
     * @var array $tib
     */
    public $tib;
    /**
     * @var float $tic
     */
    public $tic;
    /**
     * @var float $tie
     */
    public $tie;
    /**
     * @var array $others
     */
    public $others;
    /**
     * @var array $tid
     */
    public $tid;
    /**
     * @var array $tif
     */
    public $tif;
    /**
     * @var float $tig
     */
    public $tig;
    /**
     * @var float $tih
     */
    public $tih;
    /**
     * @var array $others2
     */
    public $others2;

    private function __construct() {
        $this->tia = [
            "a" => 1,
            "b" => 2,
            "c" => 3,
        ];
        $this->tib = array_merge([], $this->tia, [
            "d" => 4,
            "e" => 5,
        ]);
        $this->tic = $this->tib["c"];
        $this->tie = $this->tib["e"];
        $this->others = Stdlib::objectOmit($this->tib, ["c", "e"]);
        $this->tid = [1, 2, 3];
        $this->tif = array_merge([5], $this->tid, [6]);
        $this->tig = $this->tif[0];
        $this->tih = $this->tif[1];
        $this->others2 = array_slice($this->tif, 2);
        \VK\Elephize\Builtins\Console::log($this->tic, $this->tie, $this->others);
        \VK\Elephize\Builtins\Console::log($this->tig, $this->tih, $this->others2);
    }
}
