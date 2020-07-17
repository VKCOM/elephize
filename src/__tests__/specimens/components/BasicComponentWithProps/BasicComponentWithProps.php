<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
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
        return $this->h(
            IntrinsicElement::get("div"),
            [],
            [
                $this->h(
                    IntrinsicElement::get("p"),
                    [],
                    ["You clicked ", $count, " times starting at ", $props["count"], "."]
                ),
                $this->h(IntrinsicElement::get("button"), [], [" Click me "]),
            ]
        );
    }
}
