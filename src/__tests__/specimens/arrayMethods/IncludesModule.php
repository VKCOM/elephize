<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class IncludesModule extends CJSModule {
    /**
     * @var IncludesModule $_mod
     */
    private static $_mod;
    public static function getInstance(): IncludesModule {
        if (!self::$_mod) {
            self::$_mod = new IncludesModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $ain
     */
    public $ain;
    /**
     * @var boolean $bin
     */
    public $bin;
    /**
     * @var boolean $cin
     */
    public $cin;

    private function __construct() {
        $this->ain = [1, 2, 3];
        $this->bin = in_array(2, $this->ain, true);
        $this->cin = in_array(2, array_slice($this->ain, 1), true);
        \VK\Elephize\Builtins\Console::log($this->bin, $this->cin);
    }
}
