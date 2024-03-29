<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\NestedComponentWithDummyInProps;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

class NestedComponentWithDummyInProps extends RenderableComponent {
    /**
     * @var NestedComponentWithDummyInProps $_mod
     */
    private static $_mod;
    public static function getInstance(): NestedComponentWithDummyInProps {
        if (!self::$_mod) {
            self::$_mod = new NestedComponentWithDummyInProps();
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
        $anon_3b2ed12 = [0];
        $count = (float) $anon_3b2ed12[0];
        $arr = [1, 2, 3];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                $props["componentToRender"],
                \specimens\components\DummyComponent\DummyComponent::getInstance()->render(["count" => $count], []),
                Stdlib::arrayMap1(
                    $arr,
                    /* anon_b4f3ee1 */ function ($val) use ($count) {
                        return \specimens\components\DummyComponent\DummyComponent::getInstance()->render(
                            ["key" => $val, "count" => $count],
                            []
                        );
                    }
                ),
            ]
        );
    }
}
