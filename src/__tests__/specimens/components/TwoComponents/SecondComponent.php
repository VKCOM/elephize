<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\TwoComponents;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

require_once __DIR__ . '/../TwoComponentsModule.php';

class SecondComponent extends RenderableComponent {
    /**
     * @var SecondComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): SecondComponent {
        if (!self::$_mod) {
            self::$_mod = new SecondComponent();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param array $initial_props
     * @param array $children
     * @return ?string
     */
    public function render(array $initial_props, array $children) {
        $props = array_merge(
            [],
            \VK\Elephize\src\__tests__\specimens\components\TwoComponentsModule::getInstance()->default_props,
            [],
            $initial_props,
            []
        );
        $count = (float) $props["count"];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("p")->render([], ["You clicked ", $count, " times"]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render([], [" Click me "]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }
}
