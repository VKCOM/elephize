<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\arrayMethods;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ForEachModule extends CJSModule {
    /**
     * @var ForEachModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ForEachModule {
        if (!self::$_mod) {
            self::$_mod = new ForEachModule();
        }
        return self::$_mod;
    }

    /**
     * @var float[] $af
     */
    public $af;
    /**
     * @var float[] $afo
     */
    public $afo;

    private function __construct() {
        $this->af = [1, 2, 3];
        foreach ($this->af as $el) {
            \VK\Elephize\Builtins\Console::log($el * 2);
        }
        foreach ($this->af as $idx => $el) {
            if ($el > 1) {
                break;
            }
            $this->af[$idx] = $el * 2;
        }
        foreach ($this->af as $idx => $el) {
            $this->af[$idx] = $el * $idx;
        }
        $this->afo = [
            "a" => 1,
            "b" => 2,
        ];
        foreach (array_keys($this->afo) as $val) {
            \VK\Elephize\Builtins\Console::log($this->afo[$val]);
        }
    }
}
