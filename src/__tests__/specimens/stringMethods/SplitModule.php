<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\stringMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class SplitModule extends CJSModule {
    /**
     * @var SplitModule $_mod
     */
    private static $_mod;
    public static function getInstance(): SplitModule {
        if (!self::$_mod) {
            self::$_mod = new SplitModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $aspl
     */
    public $aspl;
    /**
     * @var array $bspl
     */
    public $bspl;
    /**
     * @var array $cspl
     */
    public $cspl;
    /**
     * @var array $dspl
     */
    public $dspl;
    /**
     * @var array $espl
     */
    public $espl;

    private function __construct() {
        $this->aspl = "12:3:45";
        $this->bspl = explode(":", $this->aspl);
        $this->cspl = explode(":", $this->aspl, 1);
        $this->dspl = preg_split("/[24]/i", $this->aspl);
        $this->espl = preg_split("/[24]/i", $this->aspl, 1);
        \VK\Elephize\Builtins\Console::log($this->bspl, $this->cspl, $this->dspl, $this->espl);
    }
}
