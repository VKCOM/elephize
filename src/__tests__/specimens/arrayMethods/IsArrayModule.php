<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class IsArrayModule extends CJSModule {
    /**
     * @var IsArrayModule $_mod
     */
    private static $_mod;
    public static function getInstance(): IsArrayModule {
        if (!self::$_mod) {
            self::$_mod = new IsArrayModule();
        }
        return self::$_mod;
    }

    public $iaa;
    public $iab;
    public $iac;

    private function __construct() {
        $this->iaa = Stdlib::arrayIsArray([1, 2, 3, 4]);
        $this->iab = Stdlib::arrayIsArray([
            "a" => 1,
            "b" => 2,
        ]);
        $this->iac = Stdlib::arrayIsArray(123);
        \VK\Elephize\Builtins\Console::log($this->iaa, $this->iab, $this->iac);
    }
}
