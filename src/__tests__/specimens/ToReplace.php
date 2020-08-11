<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ToReplace {
    /**
     * @param string $test
     * @return string
     */
    public function getLang($test) {
        return $test . $test;
    }
}
