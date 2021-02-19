<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class IndexOfModule extends CJSModule {
    /**
     * @var IndexOfModule $_mod
     */
    private static $_mod;
    public static function getInstance(): IndexOfModule {
        if (!self::$_mod) {
            self::$_mod = new IndexOfModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $aio
     */
    public $aio;
    /**
     * @var float $bio
     */
    public $bio;
    /**
     * @var float $cio
     */
    public $cio;
    /**
     * @var float $dio
     */
    public $dio;
    /**
     * @var float $fio
     */
    public $fio;

    private function __construct() {
        $this->aio = [1, 2, 3];
        $this->bio = Stdlib::arrayIndexOf(2, $this->aio);
        $this->cio = Stdlib::arrayIndexOf(1, $this->aio, 1);
        $this->dio = Stdlib::arrayLastIndexOf(1, $this->aio);
        $this->fio = Stdlib::arrayLastIndexOf(1, $this->aio, 1);
        \VK\Elephize\Builtins\Console::log($this->bio, $this->cio, $this->dio, $this->fio);
    }
}
