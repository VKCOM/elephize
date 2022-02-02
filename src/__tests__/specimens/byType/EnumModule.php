<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;
use VK\Elephize\Builtins\ReactContextSynthetic;

class EnumModule extends CJSModule {
    /**
     * @var EnumModule $_mod
     */
    private static $_mod;
    public static function getInstance(): EnumModule {
        if (!self::$_mod) {
            self::$_mod = new EnumModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $enut1
     */
    public $enut1;
    /**
     * @var float $enut2
     */
    public $enut2;
    /**
     * @var string $enut3
     */
    public $enut3;

    private function __construct() {
        $this->enut1 = \specimens\byType\enum\NumberedEnumEnum::KEK;
        $this->enut2 = \specimens\byType\enum\ForcedNumberedEnumEnum::AZAZA;
        $this->enut3 = \specimens\byType\enum\ValuesBasedEnumEnum::LOL;
        \VK\Elephize\Builtins\Console::log($this->enut1, $this->enut2, $this->enut3);
    }
}
