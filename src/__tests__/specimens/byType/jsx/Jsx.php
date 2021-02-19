<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
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
            IntrinsicElement::get("div")->render(
                ["id" => "test"],
                [IntrinsicElement::get("b")->render([], ["ololo"]), "test"]
            ),
            IntrinsicElement::get("i")->render([], ["test1"]),
        ]);
        $jsxb = IntrinsicElement::get("b")->render([], [$jsxa]);
        $jsxprops = [
            "id" => "test",
            "className" => "test2",
        ];
        $jsxc = IntrinsicElement::get("div")->render(
            array_merge(["aria-atomic" => true, "title" => "testtitle"], $jsxprops, $jsxprops),
            ["Oh my ", $jsxb, " my oh"]
        );
        return $jsxc;
    }
}
