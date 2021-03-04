<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\components\ComponentWithOuterFunction;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

require_once __DIR__ . '/../ComponentWithOuterFunctionModule.php';

class ComponentWithOuterFunction extends RenderableComponent {
    /**
     * @var ComponentWithOuterFunction $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentWithOuterFunction {
        if (!self::$_mod) {
            self::$_mod = new ComponentWithOuterFunction();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param array $props
     * @param array $children
     * @return ?string
     */
    public function render(array $props, array $children) {
        $classes = $props["classes"];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [
                "className" => \VK\Elephize\src\__tests__\specimens\components\ComponentWithOuterFunctionModule::getInstance()->prepareClasses(
                    \VK\Elephize\src\__tests__\specimens\components\ComponentWithOuterFunctionModule::getInstance()->morePrepare(
                        $classes
                    )
                ),
            ],
            [$children]
        );
    }
}
