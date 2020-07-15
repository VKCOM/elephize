<?php
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
     * @var array $af
     */
    public $af;

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
    }
}
