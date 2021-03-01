<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class LoopsModule extends CJSModule {
    /**
     * @var LoopsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): LoopsModule {
        if (!self::$_mod) {
            self::$_mod = new LoopsModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $obj
     */
    public $obj;
    /**
     * @var array $obj2
     */
    public $obj2;

    private function __construct() {
        for ($i = 0; $i < 3; $i++) {
            \VK\Elephize\Builtins\Console::log($i);
        }
        $this->obj = [
            "a" => 1,
            "b" => 2,
        ];
        foreach ($this->obj as $i => $_tmpVal) {
            if (!isset($this->obj[$i])) {
                continue;
            }
            \VK\Elephize\Builtins\Console::log($i);
        }
        $this->obj2 = [1, 2, 3];
        foreach ($this->obj2 as $j) {
            \VK\Elephize\Builtins\Console::log($j);
        }
        while (true) {
            \VK\Elephize\Builtins\Console::log("kek!");
            if ($this->obj) {
                break;
            }
        }
        do {
            \VK\Elephize\Builtins\Console::log("lol!");
            if ($this->obj) {
                break;
            }
        } while (true);
    }
}
