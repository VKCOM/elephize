<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\PathResolveReact\index;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\ReactContext;
use VK\Elephize\Builtins\ReactContextSynthetic;

class ReactPathResolveAnonymousModule extends RenderableComponent {
    /**
     * @var ReactPathResolveAnonymousModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ReactPathResolveAnonymousModule {
        if (!self::$_mod) {
            self::$_mod = new ReactPathResolveAnonymousModule();
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
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render([], ["foo"]);
    }
}
