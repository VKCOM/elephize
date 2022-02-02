<?php

namespace __ROOTNS__\Builtins;

abstract class RenderableComponent extends AbstractComponent {
    /**
     * @param array $props
     * @param array $children
     * @return ?string
     */
    abstract public function render(array $props, array $children);
}
