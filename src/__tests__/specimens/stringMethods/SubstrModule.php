<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\stringMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class SubstrModule extends CJSModule {
    /**
     * @var SubstrModule $_mod
     */
    private static $_mod;
    public static function getInstance(): SubstrModule {
        if (!self::$_mod) {
            self::$_mod = new SubstrModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $asub
     */
    public $asub;
    /**
     * @var string $bsub
     */
    public $bsub;
    /**
     * @var string $csub
     */
    public $csub;

    private function __construct() {
        $this->asub = "12345";
        $this->bsub = substr($this->asub, 2);
        $this->csub = substr($this->asub, 2, 2);
        \VK\Elephize\Builtins\Console::log($this->bsub, $this->csub);
    }
}
