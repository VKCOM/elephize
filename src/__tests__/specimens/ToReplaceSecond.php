<?php
namespace specimens;

class ToReplaceSecond {
    /**
     * @param string $test
     * @return string
     */
    public function getFoo($test, $test2) {
        return $test . $test . $test2;
    }
    
    /**
     * @param string $test
     * @param string $test2
     * @return string
     */
    public function getTest1($test, $test2 = '') {
        return $test . $test . $test2;
    }

    /**
     * @param string $test
     * @param string $test2
     * @return string
     */
    public function getTest2($test = '', $test2 = '') {
        return $test . $test . $test2;
    }
    
    /**
     * @param string $test
     * @param string $test2
     * @param mixed $args
     * @return string
     */
    public function getTest3($test = '', $test2 = '', ...$args) {
        return $test . $test . $test2 . $args[0];
    } 
    
    /**
     * @param mixed $args
     * @return string
     */
    public function getTest4($test = '', string $test2, ...$args) {
        return $test . $test . $test2 . $args[0];
    }
    
    /**
     * @param mixed $args
     * @return string
     */
    public function getTest5($test = '', string $test2 = 'lol', ...$args) {
        return $test . $test . $test2 . $args[0];
    }

    /**
     * @param string $test
     * @return string
     */
    public static function getBar($test) {
        return $test . $test;
    }
}
