<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\BasicComponentWithProps;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

class BasicComponentWithProps extends RenderableComponent {
    /**
     * @var BasicComponentWithProps $_mod
     */
    private static $_mod;
    public static function getInstance(): BasicComponentWithProps {
        if (!self::$_mod) {
            self::$_mod = new BasicComponentWithProps();
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
        $_e8afc0c = [$props["count"]];
        $count = $_e8afc0c[0];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("p")->render(
                    [],
                    ["You clicked ", $count, " times starting at ", $props["count"], "."]
                ),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render([], [" Click me "]),
            ]
        );
    }
}
