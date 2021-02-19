<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require __DIR__ . '/../ToReplace.php';

class ToReplaceCjsWrapper extends CJSModule {
    /**
     * @var ToReplace $_impl
     */
    private $_impl;

    /**
     * @var ToReplaceCjsWrapper $_mod
     */
    private static $_mod;

    public static function getInstance(): ToReplaceCjsWrapper {
        if (!self::$_mod) {
            self::$_mod = new ToReplaceCjsWrapper();
        }
        return self::$_mod;
    }

    /**
     * @param string $test
     * @return string
     */
    public function getLang($test) {
        return $this->_impl->getLang($test);
    }

    /**
     * @param string $test
     * @return string
     */
    public function getLangStatic($test) {
        return ToReplace::getLangStatic($test);
    }

    private function __construct() {
        $this->_impl = new ToReplace();
    }
}
