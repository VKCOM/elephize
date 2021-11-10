<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\ReactContextConsumer;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\ReactContext;

class ReactContextConsumer extends RenderableComponent {
    /**
     * @var ReactContextConsumer $_mod
     */
    private static $_mod;
    public static function getInstance(): ReactContextConsumer {
        if (!self::$_mod) {
            self::$_mod = new ReactContextConsumer();
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
        $innerctx_value = \VK\Elephize\Builtins\ReactContext::getValue($props["innerctx"]);
        $outerctx_value = \VK\Elephize\Builtins\ReactContext::getValue(
            \specimens\components\ReactContextSourceModule::getInstance()->Ctx1
        );
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                "Inner: ",
                \VK\Elephize\Builtins\IntrinsicElement::escape($innerctx_value),
                ", outer: ",
                \VK\Elephize\Builtins\IntrinsicElement::escape($outerctx_value),
            ]
        );
    }
}