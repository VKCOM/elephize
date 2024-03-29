<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\misc;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ToReplaceCjsWrapper extends CJSModule {
    /**
     * @var \specimens\ToReplace $_impl
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
        return \specimens\ToReplace::getLangStatic($test);
    }

    private function __construct() {
        $this->_impl = new \specimens\ToReplace();
    }
}
