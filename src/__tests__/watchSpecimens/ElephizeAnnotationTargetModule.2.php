<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace watchSpecimens___;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ElephizeAnnotationTargetModule extends CJSModule {
    /**
     * @var ElephizeAnnotationTargetModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ElephizeAnnotationTargetModule {
        if (!self::$_mod) {
            self::$_mod = new ElephizeAnnotationTargetModule();
        }
        return self::$_mod;
    }

    /**
     * @return string
     */
    public function ElephizeAnnotationTarget() {
        $anon_3b2ed12 = [0];
        $count = (float) $anon_3b2ed12[0];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [],
            [
                \VK\Elephize\Builtins\IntrinsicElement::get("p")->render([], ["You clicked ", $count, " times "]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render([], [" Click me "]),
                \VK\Elephize\Builtins\IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }

    private function __construct() {
    }
}
