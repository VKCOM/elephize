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
                $this->h(IntrinsicElement::get("p"), [], ["You clicked ", $count, " times "]),
                $this->h(IntrinsicElement::get("button"), [], [" Click me "]),
                $this->h(IntrinsicElement::get("button"), ["disabled" => true], [" Click me "]),
            ]
        );
    }

    private function __construct() {
    }
}
