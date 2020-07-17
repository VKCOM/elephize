<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class Jsx extends RenderableComponent {
    /**
     * @var Jsx $_mod
     */
    private static $_mod;
    public static function getInstance(): Jsx {
        if (!self::$_mod) {
            self::$_mod = new Jsx();
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
        $jsxa = $this->frg([
            $this->h(
                IntrinsicElement::get("div"),
                ["id" => "test"],
                [$this->h(IntrinsicElement::get("b"), [], ["ololo"]), "test"]
            ),
            $this->h(IntrinsicElement::get("i"), [], ["test1"]),
        ]);
        $jsxb = $this->h(IntrinsicElement::get("b"), [], [$jsxa]);
        $jsxprops = [
            "id" => "test",
            "className" => "test2",
        ];
        $jsxc = $this->h(IntrinsicElement::get("div"), array_merge(["title" => "testtitle"], $jsxprops, $jsxprops), [
            "Oh my ",
            $jsxb,
            " my oh",
        ]);
        return $jsxc;
    }
}
