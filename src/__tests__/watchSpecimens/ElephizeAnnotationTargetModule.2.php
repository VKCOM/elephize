<?php
/* NOTICE: Generated file; Do not edit by hand */
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
     * @return var
     */
    public function ElephizeAnnotationTarget() {
        $_3b2ed12 = [0];
        $count = $_3b2ed12[0];
        return $this->h(
            IntrinsicElement::get("div"),
            [],
            [
                IntrinsicElement::get("p")->render([], ["You clicked ", $count, " times "]),
                IntrinsicElement::get("button")->render([], [" Click me "]),
                IntrinsicElement::get("button")->render(["disabled" => true], [" Click me "]),
            ]
        );
    }

    private function __construct() {
    }
}
