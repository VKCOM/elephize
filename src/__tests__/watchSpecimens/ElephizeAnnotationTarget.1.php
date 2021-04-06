<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\watchSpecimens___\elephizeAnnotationTarget_entry;
use VK\Elephize\Builtins\RenderableComponent;
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
     * @return ?string
     */
    public function render(array $props, array $children) {
        $anon_3b2ed12 = [0];
        $count = (float) $anon_3b2ed12[0];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("p")->render([], ["You clicked ", $count, " times "]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render([], [" Click me "]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }
}
