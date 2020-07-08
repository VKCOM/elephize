<?php
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

require_once __DIR__ . '/../DummyComponent/DummyComponent.php';

class NestedComponent extends RenderableComponent
{
    /**
     * @var NestedComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): NestedComponent
    {
        if (!self::$_mod) {
            self::$_mod = new NestedComponent();
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
        $arr = [1, 2, 3];
        return $this->h(
            IntrinsicElement::get("div"),
            [],
            [
                $this->h(DummyComponent::getInstance(), ["count" => $count], []),
                Stdlib::arrayMap1(
                    $arr,
                    /* _b4f3ee1 */ function ($val) use ($count) {
                        return $this->h(
                            DummyComponent::getInstance(),
                            ["key" => $val, "count" => $count],
                            []
                        );
                    }
                ),
            ]
        );
    }
}
