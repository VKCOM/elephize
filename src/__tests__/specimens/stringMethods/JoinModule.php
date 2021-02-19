<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class JoinModule extends CJSModule {
    /**
     * @var JoinModule $_mod
     */
    private static $_mod;
    public static function getInstance(): JoinModule {
        if (!self::$_mod) {
            self::$_mod = new JoinModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $ajn
     */
    public $ajn;
    /**
     * @var string $bjn
     */
    public $bjn;
    /**
     * @var string $cjn
     */
    public $cjn;

    private function __construct() {
        $this->ajn = ["12", "3", "45"];
        $this->bjn = implode(":", $this->ajn);
        $this->cjn = implode($this->ajn);
        \VK\Elephize\Builtins\Console::log($this->bjn, $this->cjn);
    }
}
