<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class DefaultOperatorModule extends CJSModule {
    /**
     * @var DefaultOperatorModule $_mod
     */
    private static $_mod;
    public static function getInstance(): DefaultOperatorModule {
        if (!self::$_mod) {
            self::$_mod = new DefaultOperatorModule();
        }
        return self::$_mod;
    }

    public $doa;
    public $dob;
    public $doc;
    public $dod;

    private function __construct() {
        $this->doa = [1, 2, 3];
        $this->dob = false;
        $this->doc = $this->dob ?: [
            "a" => true,
        ];
        $this->dod = $this->doa[5] ?: count($this->doa);
        \VK\Elephize\Builtins\Console::log($this->doc, $this->dod);
    }
}
