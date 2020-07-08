<?php
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class BasicComponent extends RenderableComponent
{
    /**
     * @var BasicComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): BasicComponent
    {
        if (!self::$_mod) {
            self::$_mod = new BasicComponent();
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
    public function render(array $props, array $children)
    {
        $_3b2ed12 = [0];
        $count = $_3b2ed12[0];
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
