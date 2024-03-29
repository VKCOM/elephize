<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\stringMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class MatchModule extends CJSModule {
    /**
     * @var MatchModule $_mod
     */
    private static $_mod;
    public static function getInstance(): MatchModule {
        if (!self::$_mod) {
            self::$_mod = new MatchModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $amat
     */
    public $amat;
    /**
     * @var mixed[] $dmat
     */
    public $dmat;
    /**
     * @var mixed[] $emat
     */
    public $emat;

    private function __construct() {
        $this->amat = "12:3:45";
        $this->dmat = Stdlib::strMatch("/[24]/iu", $this->amat);
        $this->emat = Stdlib::strMatchG("/[24]/iu", $this->amat);
        \VK\Elephize\Builtins\Console::log($this->dmat, $this->emat);
    }
}
