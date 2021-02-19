<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class ReactSupport extends RenderableComponent {
    /**
     * @var ReactSupport $_mod
     */
    private static $_mod;
    public static function getInstance(): ReactSupport {
        if (!self::$_mod) {
            self::$_mod = new ReactSupport();
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
        $_9911d2a = [0];
        $count = $_9911d2a[0];
        \VK\Elephize\Builtins\Console::log($count);
        \VK\Elephize\Builtins\Console::log($theme);
        $_2e8ff8c = [[1, 2, 3, 4]];
        $state = $_2e8ff8c[0];
        \VK\Elephize\Builtins\Console::log($state);
        $memoized_callback();
        \VK\Elephize\Builtins\Console::log($memoized);
        \VK\Elephize\Builtins\Console::log($ref);
        return IntrinsicElement::get("div")->render([], []);
    }
}
