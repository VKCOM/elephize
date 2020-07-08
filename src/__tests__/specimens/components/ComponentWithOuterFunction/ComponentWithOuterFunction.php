<?php
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\IntrinsicElement;
use VK\Elephize\Builtins\Stdlib;

require_once __DIR__ . '/../ComponentWithOuterFunctionModule.php';

class ComponentWithOuterFunction extends RenderableComponent
{
    /**
     * @var ComponentWithOuterFunction $_mod
     */
    private static $_mod;
    public static function getInstance(): ComponentWithOuterFunction
    {
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
     * @return string
     */
    public function render(array $props, array $children)
    {
        $classes = $props["classes"];
        return $this->h(
            IntrinsicElement::get("div"),
            [
                "className" => ComponentWithOuterFunctionModule::getInstance()->prepareClasses(
                    ComponentWithOuterFunctionModule::getInstance()->morePrepare($classes)
                )
            ],
            [$children]
        );
    }
}
