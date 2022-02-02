<?php

namespace __ROOTNS__\Builtins;

/**
 * Synthetic class to define order of context-related commands.
 *
 * We should ensure that pushContext() is executed strictly before render(),
 * and popContext() - strictly after render(). If we implement it as array, like
 *    return render([], [
 *        pushContext(...),
 *        render([...], [...]),
 *        popContext(...)
 *    ])
 * it works perfectly in PHP, though it fails in KPHP because array literals are transpiled
 * to C++ function make_array(...), but in C++ the order of evaluation of arguments is
 * undefined behavior, see https://en.cppreference.com/w/cpp/language/eval_order
 */
class ReactContextSynthetic extends AbstractComponent {
    /**
     * @var ?string
     */
    protected $_renderedString = null;

    /**
     * @return ReactContextSynthetic
     */
    public static function spawn(): ReactContextSynthetic {
        return new ReactContextSynthetic();
    }

    /**
     * @param ReactContext $ctx
     * @param mixed $providerValue
     * @return self
     */
    public function pushContext(ReactContext $ctx, $providerValue = null)
    {
        $ctx->pushContext($providerValue);
        return $this;
    }

    /**
     * @param array $children
     * @return self
     */
    public function render(array $children)
    {
        $this->_renderedString = $this->frg($children);
        return $this;
    }

    /**
     * @param ReactContext $ctx
     * @return ?string
     */
    public function popContext(ReactContext $ctx)
    {
        $ctx->popContext();
        return $this->_renderedString;
    }
}

