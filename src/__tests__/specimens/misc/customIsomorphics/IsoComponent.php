<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\misc\customIsomorphics;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

class IsoComponent extends RenderableComponent {
    /**
     * @var IsoComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): IsoComponent {
        if (!self::$_mod) {
            self::$_mod = new IsoComponent();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param mixed[] $props
     * @param mixed[] $children
     * @return ?string
     */
    public function render(array $props, array $children) {
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [
                "className" => \VK\Elephize\Builtins\IntrinsicElement::escape(
                    \specimens\misc\toReplaceIndex\ToReplaceSecondCjsWrapper::getInstance()->classNames("Test")
                ),
            ],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
                    ["className" => \VK\Elephize\Builtins\IntrinsicElement::escape(["A", "B", "C"])],
                    []
                ),
            ]
        );
    }
}
