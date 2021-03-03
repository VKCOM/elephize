<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\NestedConditionalComponent;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

require_once __DIR__ . '/../DummyComponent/DummyComponent.php';

class ComponentWrapper extends RenderableComponent {
    /**
     * @var ComponentWrapper $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentWrapper {
        if (!self::$_mod) {
            self::$_mod = new ComponentWrapper();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param array $props
     * @param array $children
     * @return string
     */
    public function render(array $props, array $children) {
        $other = Stdlib::objectOmit($props, ["children"]);
        return \VK\Elephize\src\__tests__\specimens\components\DummyComponent\DummyComponent::getInstance()->render(
            $other,
            [$children]
        );
    }
}
