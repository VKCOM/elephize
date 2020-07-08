<?php
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

class BasicComponentWithViewLogic extends RenderableComponent
{
    /**
     * @var BasicComponentWithViewLogic $_mod
     */
    private static $_mod;
    public static function getInstance(): BasicComponentWithViewLogic
    {
        if (!self::$_mod) {
            self::$_mod = new BasicComponentWithViewLogic();
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
        $_e8afc0c = [$props["count"]];
        $count = $_e8afc0c[0];
        $sec = $props["timestampInSeconds"] % 60;
        $min = floor($props["timestampInSeconds"] / 60) % 60;
        $hr = floor($props["timestampInSeconds"] / (60 * 60)) % 24;
        $sec_str = $sec < 10 ? "0" . (string) $sec : (string) $sec;
        $min_str = $min < 10 ? "0" . (string) $min : (string) $min;
        $hr_str = $hr < 10 ? "0" . (string) $hr : (string) $hr;
        $time = $hr_str . ":" . $min_str . ":" . $sec_str;
        $keys = [$hr_str, $min_str, $sec_str];
        return $this->h(
            IntrinsicElement::get("div"),
            [],
            [
                $this->h(
                    IntrinsicElement::get("p"),
                    [],
                    [
                        "You clicked ",
                        $count,
                        " times starting at ",
                        $props["count"],
                        ".",
                    ]
                ),
                $this->h(
                    IntrinsicElement::get("button"),
                    [],
                    [
                        $time,
                        " Click me @ ",
                        Stdlib::arrayMap1(
                            $keys,
                            /* _1100a5a */ function ($c) {
                                return $this->h(IntrinsicElement::get("b"), ["key" => "b"], [$c]);
                            }
                        ),
                        $this->h(
                            IntrinsicElement::get("table"),
                            [],
                            [
                                $this->h(
                                    IntrinsicElement::get("tbody"),
                                    [],
                                    [
                                        Stdlib::arrayMap2(
                                            $props["children"],
                                            /* _28597c3 */ function ($row, $idx) {
                                                return $this->h(
                                                    IntrinsicElement::get("tr"),
                                                    ["key" => "tr" . (string) $idx],
                                                    ["test"]
                                                );
                                            }
                                        ),
                                    ]
                                ),
                            ]
                        ),
                    ]
                ),
            ]
        );
    }
}
