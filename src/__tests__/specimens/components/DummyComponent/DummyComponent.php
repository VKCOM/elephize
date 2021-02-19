<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class DummyComponent extends RenderableComponent {
    /**
     * @var DummyComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): DummyComponent {
        if (!self::$_mod) {
            self::$_mod = new DummyComponent();
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
        return IntrinsicElement::get("div")->render(
            [],
            [
                IntrinsicElement::get("p")->render([], ["You clicked ", $props["count"], " times"]),
                IntrinsicElement::get("button")->render([], [" Click me "]),
                IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }
}
