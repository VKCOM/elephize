<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
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

    /**
     * @var array $doa
     */
    public $doa;
    /**
     * @var boolean $dob
     */
    public $dob;
    /**
     * @var array $doc
     */
    public $doc;
    /**
     * @var float $dod
     */
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
