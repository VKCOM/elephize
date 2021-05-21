<?php
namespace specimens;

class ToReplaceSecond {
    /**
     * @param string $test
     * @return string
     */
    public function getFoo($test) {
        return $test . $test;
    }

    /**
     * @param string $test
     * @return string
     */
    public static function getBar($test) {
        return $test . $test;
    }
}
