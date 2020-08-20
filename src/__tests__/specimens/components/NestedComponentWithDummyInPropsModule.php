<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

require_once __DIR__ . '/DummyComponent/DummyComponent.php';
require_once __DIR__ . '/NestedComponentWithDummyInProps/NestedComponentWithDummyInProps.php';

class NestedComponentWithDummyInPropsModule extends CJSModule {
    /**
     * @var NestedComponentWithDummyInPropsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): NestedComponentWithDummyInPropsModule {
        if (!self::$_mod) {
            self::$_mod = new NestedComponentWithDummyInPropsModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function test() {
        return NestedComponentWithDummyInProps::getInstance()->render(
            ["componentToRender" => DummyComponent::getInstance()->render(["count" => 1], [])],
            []
        );
    }

    private function __construct() {
    }
}
