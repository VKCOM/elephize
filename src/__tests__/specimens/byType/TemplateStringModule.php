<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class TemplateStringModule extends CJSModule {
    /**
     * @var TemplateStringModule $_mod
     */
    private static $_mod;
    public static function getInstance(): TemplateStringModule {
        if (!self::$_mod) {
            self::$_mod = new TemplateStringModule();
        }
        return self::$_mod;
    }

    /**
     * @var string $tsa
     */
    public $tsa;
    /**
     * @var string $tsb
     */
    public $tsb;
    /**
     * @var string $tsc
     */
    public $tsc;
    /**
     * @var string $tsd
     */
    public $tsd;
    /**
     * @var string $tse
     */
    public $tse;

    private function __construct() {
        $this->tsa = "Hello world";
        $this->tsb = "Wow " . $this->tsa;
        $this->tsc = "Lol " . strlen($this->tsb) . " kek " . strlen($this->tsa) . " wow";
        $this->tsd = "Kek " . ($this->tsc . substr($this->tsb, 1)) . " lol";
        $this->tse = $this->tsa . " wow";
        \VK\Elephize\Builtins\Console::log($this->tsd, $this->tse);
    }
}
