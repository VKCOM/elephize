<?php

namespace __ROOTNS__\Builtins;

class ReactContext {
    /**
     * @var mixed[]
     */
    private $_valuesStack = [];
    /**
     * @var mixed
     */
    private $_lastNotNullValue = null;

    /**
     * @param mixed $initialValue
     */
    public function __construct($initialValue) {
        $this->_valuesStack []= $initialValue;
        $this->_lastNotNullValue = $initialValue;
    }

    /**
     * @param mixed $initialValue
     * @return ReactContext
     */
    public static function createWithDefault($initialValue) {
        return new self($initialValue);
    }

    /**
     * @param ReactContext $ctx
     * @param ?mixed $providerValue
     * @return null
     */
    public static function pushContext(ReactContext $ctx, $providerValue = null) {
        $ctx->_valuesStack []= $providerValue;
        if ($providerValue !== null) {
            $ctx->_lastNotNullValue = $providerValue;
        }
        return null;
    }

    /**
     * @param ReactContext $ctx
     * @return null
     */
    public static function popContext(ReactContext $ctx) {
        $val = array_pop($ctx->_valuesStack);
        if ($val !== null) {
            for ($i = count($ctx->_valuesStack) - 1; $i >= 0; $i--) {
                if ($ctx->_valuesStack[$i] !== null) {
                    $ctx->_lastNotNullValue = $ctx->_valuesStack[$i];
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * @param mixed[] $children
     * @return string
     */
    public static function render($children) {
        return implode('', array_filter($children));
    }

    /**
     * @param ReactContext $ctx
     * @return mixed
     */
    public static function getValue(ReactContext $ctx) {
        return $ctx->_lastNotNullValue;
    }
}

