<?php
namespace specimens;

class ToReplace {
    /**
     * @param string $test
     * @return string
     */
    public function getLang($test) {
        return $test . $test;
    }

    /**
     * @param string $test
     * @return string
     */
    public static function getLangStatic($test) {
        return $test . $test;
    }
}
