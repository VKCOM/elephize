<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\TypedComponent;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

class TypedComponent extends RenderableComponent {
    /**
     * @var TypedComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): TypedComponent {
        if (!self::$_mod) {
            self::$_mod = new TypedComponent();
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
        $classes = (string) $props["classes"];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(["className" => $classes], [$children]);
    }
}
