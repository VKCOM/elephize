<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\misc\elephizeIgnore;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

class ComponentIgnore extends RenderableComponent {
    /**
     * @var ComponentIgnore $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentIgnore {
        if (!self::$_mod) {
            self::$_mod = new ComponentIgnore();
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
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render([], ["test"]);
    }
}
