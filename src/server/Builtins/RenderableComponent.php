<?php

namespace __ROOTNS__\Builtins;

abstract class RenderableComponent extends CJSModule {
    /**
     * @param array $props
     * @param array $children
     * @return string
     */
    abstract public function render(array $props, array $children);

    /**
     * @param RenderableComponent $component
     * @param array $attributes
     * @param array $children
     * @return string
     */
    protected function h(RenderableComponent $component, array $attributes, array $children) {
        return $component->render($attributes, $children);
    }

    /**
     * React.Fragment support
     *
     * @param string[] $rendered_components
     * @return string
     */
    protected function frg(array $rendered_components) {
        return implode("\n", $rendered_components);
    }

    /**
     * @param var $array
     * @return var
     */
    protected function flatten($array) {
        $flat = [];

        foreach ($array as $item) {
            if (is_array($item)) {
                $flat = array_merge($flat, $this->flatten($item));
            } else {
                $flat[] = $item;
            }
        }

        return $flat;
    }
}
