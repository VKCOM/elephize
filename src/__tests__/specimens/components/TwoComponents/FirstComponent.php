<?php
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

require_once __DIR__ . '/../TwoComponentsModule.php';

class FirstComponent extends RenderableComponent {
    /**
     * @var FirstComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): FirstComponent {
        if (!self::$_mod) {
            self::$_mod = new FirstComponent();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param array $initial_props
     * @param array $children
     * @return string
     */
    public function render(array $initial_props, array $children) {
        $props = array_merge([], TwoComponentsModule::getInstance()->default_props, [], $initial_props, []);
        $count = $props["count"];
        return $this->h(
            IntrinsicElement::get("div"),
            [],
            [
                $this->h(IntrinsicElement::get("p"), [], ["You clicked ", $count, " times"]),
                $this->h(IntrinsicElement::get("button"), [], [" Click me "]),
                $this->h(IntrinsicElement::get("button"), ["disabled" => true], [" Click me "]),
            ]
        );
    }
}
