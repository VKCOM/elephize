<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\ComponentBinaryOperators;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class ComponentBinaryOperators extends RenderableComponent {
    /**
     * @var ComponentBinaryOperators $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentBinaryOperators {
        if (!self::$_mod) {
            self::$_mod = new ComponentBinaryOperators();
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
        $_a01e27a = [$props["initialValue"] ?: ""];
        $input_value = $_a01e27a[0];
        return IntrinsicElement::get("div")->render(
            [],
            [
                IntrinsicElement::get("p")->render([], ["You clicked ", $props["count"], " times"]),
                IntrinsicElement::get("button")->render([], [" Click me "]),
                $input_value
                    ? IntrinsicElement::get("span")->render(["className" => "someSpan"], [$input_value])
                    : $input_value,
            ]
        );
    }
}
