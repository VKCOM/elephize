<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\stringMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ReplaceModule extends CJSModule {
    /**
     * @var ReplaceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ReplaceModule {
        if (!self::$_mod) {
            self::$_mod = new ReplaceModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $arepl
     */
    public $arepl;
    /**
     * @var string $brepl
     */
    public $brepl;
    /**
     * @var string $crepl
     */
    public $crepl;
    /**
     * @var string $drepl
     */
    public $drepl;
    /**
     * @var string $erepl
     */
    public $erepl;

    private function __construct() {
        $this->arepl = "12:3:45";
        $this->brepl = implode("", explode(":", $this->arepl, 1));
        $this->crepl = str_replace(":", "", $this->arepl);
        $this->drepl = preg_replace("/[24]/iu", "test", $this->arepl, 1);
        $this->erepl = preg_replace("/[24]/iu", "tst", $this->arepl);
        \VK\Elephize\Builtins\Console::log($this->brepl, $this->crepl, $this->drepl, $this->erepl);
    }
}