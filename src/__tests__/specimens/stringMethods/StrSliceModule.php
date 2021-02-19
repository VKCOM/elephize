<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class StrSliceModule extends CJSModule {
    /**
     * @var StrSliceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): StrSliceModule {
        if (!self::$_mod) {
            self::$_mod = new StrSliceModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $asls
     */
    public $asls;
    /**
     * @var string $a1sls
     */
    public $a1sls;
    /**
     * @var string $bsls
     */
    public $bsls;
    /**
     * @var string $csls
     */
    public $csls;

    private function __construct() {
        $this->asls = "12345";
        $this->a1sls = $this->asls;
        $this->bsls = substr($this->asls, 2);
        $this->csls = substr($this->asls, 2, strlen($this->asls) - 2 - 1);
        \VK\Elephize\Builtins\Console::log($this->a1sls, $this->bsls, $this->csls);
    }
}
