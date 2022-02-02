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
    private $_lastNotNullValue;

    /**
     * @param mixed $initialValue
     */
    public function __construct($initialValue) {
        $this->_valuesStack []= $initialValue;
        $this->_lastNotNullValue = $initialValue;
    }

    /**
     * @param ?mixed $providerValue
     * @return null
     */
    public function pushContext($providerValue = null) {
        $this->_valuesStack []= $providerValue;
        if ($providerValue !== null) {
            $this->_lastNotNullValue = $providerValue;
        }
        return null;
    }

    /**
     * @return null
     */
    public function popContext() {
        $val = array_pop($this->_valuesStack);
        if ($val !== null) {
            $this->_lastNotNullValue = null;
            for ($i = count($this->_valuesStack) - 1; $i >= 0; $i--) {
                if ($this->_valuesStack[$i] !== null) {
                    $this->_lastNotNullValue = $this->_valuesStack[$i];
                    return null;
                }
            }
        }
        return null;
    }

    /**
     * @param ReactContext $ctx
     * @return mixed
     */
    public static function getValue(ReactContext &$ctx) {
        return $ctx->_lastNotNullValue;
    }
}

