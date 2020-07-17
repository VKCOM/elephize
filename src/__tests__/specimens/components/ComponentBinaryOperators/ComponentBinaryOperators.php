<?php
/* NOTICE: Generated file; Do not edit by hand */
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
        return $this->h(
            IntrinsicElement::get("div"),
            [],
            [
                $this->h(IntrinsicElement::get("p"), [], ["You clicked ", $props["count"], " times"]),
                $this->h(IntrinsicElement::get("button"), [], [" Click me "]),
                $input_value
                    ? $this->h(IntrinsicElement::get("span"), ["className" => "someSpan"], [$input_value])
                    : $input_value,
            ]
        );
    }
}
