<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\watchSpecimens___\elephizeAnnotationTarget_entry;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class ElephizeAnnotationTarget extends RenderableComponent {
    /**
     * @var ElephizeAnnotationTarget $_mod
     */
    private static $_mod;
    public static function getInstance(): ElephizeAnnotationTarget {
        if (!self::$_mod) {
            self::$_mod = new ElephizeAnnotationTarget();
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
        $_3b2ed12 = [0];
        $count = $_3b2ed12[0];
        return IntrinsicElement::get("div")->render(
            [],
            [
                IntrinsicElement::get("p")->render([], ["You clicked ", $count, " times "]),
                IntrinsicElement::get("button")->render([], [" Click me "]),
                IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }
}
