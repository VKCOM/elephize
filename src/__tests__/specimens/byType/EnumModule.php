<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

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
        $this->enut1 = \VK\Elephize\src\__tests__\specimens\byType\enum\NumberedEnumEnum::KEK;
        $this->enut2 = \VK\Elephize\src\__tests__\specimens\byType\enum\ForcedNumberedEnumEnum::AZAZA;
        $this->enut3 = \VK\Elephize\src\__tests__\specimens\byType\enum\ValuesBasedEnumEnum::LOL;
        \VK\Elephize\Builtins\Console::log($this->enut1, $this->enut2, $this->enut3);
    }
}
