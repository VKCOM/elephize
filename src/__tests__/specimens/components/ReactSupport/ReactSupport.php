<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\components\ReactSupport;
use VK\Elephize\Builtins\RenderableComponent;
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
     * @param mixed[] $props
     * @param mixed[] $children
     * @return ?string
     */
    public function render(array $props, array $children) {
        $anon_9911d2a = [0];
        $count = (float) $anon_9911d2a[0];
        \VK\Elephize\Builtins\Console::log($count);
        \VK\Elephize\Builtins\Console::log($theme);
        $anon_2e8ff8c = [[1, 2, 3, 4]];
        $state = (array) $anon_2e8ff8c[0];
        \VK\Elephize\Builtins\Console::log($state);
        $memoized_callback();
        \VK\Elephize\Builtins\Console::log($memoized);
        \VK\Elephize\Builtins\Console::log($ref);
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render([], ['kek']);
    }
}
