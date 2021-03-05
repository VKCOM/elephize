<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\misc\importedTypes;
use VK\Elephize\Builtins\RenderableComponent;
use VK\Elephize\Builtins\Stdlib;

class ImportedTypesComponent extends RenderableComponent {
    /**
     * @var ImportedTypesComponent $_mod
     */
    private static $_mod;
    public static function getInstance(): ImportedTypesComponent {
        if (!self::$_mod) {
            self::$_mod = new ImportedTypesComponent();
        }
        return self::$_mod;
    }

    private function __construct() {
    }

    /**
     * @param array $__param_destruct_1
     * @param array $children
     * @return ?string
     */
    public function render(array $__param_destruct_1, array $children) {
        $lol = (float) $__param_destruct_1["lol"];
        $flex = (float) $__param_destruct_1["flex"];
        return \VK\Elephize\Builtins\IntrinsicElement::get("div")->render(
            [
                "className" => "table-item--container",
                "style" => [
                    "flex" => $flex,
                ],
            ],
            [$lol]
        );
    }
}
