<?php
/* NOTICE: autogenerated file; Do not edit by hand */
namespace specimens\misc;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;
use VK\Elephize\Builtins\ReactContext;
use VK\Elephize\Builtins\ReactContextSynthetic;

class ComplexTypeInferenceModule extends CJSModule {
    /**
     * @var ComplexTypeInferenceModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ComplexTypeInferenceModule {
        if (!self::$_mod) {
            self::$_mod = new ComplexTypeInferenceModule();
        }
        return self::$_mod;
    }

    /**
     * @param string[] $dict
     * @return float
     */
    public function ctyiaStringDictFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param string[] $dict
     * @return float
     */
    public function ctyiaStringDictFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param bool[] $dict
     * @return float
     */
    public function ctyiaBoolDictFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param bool[] $dict
     * @return float
     */
    public function ctyiaBoolDictFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param float[] $dict
     * @return float
     */
    public function ctyiaNumDictFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param float[] $dict
     * @return float
     */
    public function ctyiaNumDictFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param mixed[] $dict
     * @return float
     */
    public function ctyiaMixedDictFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param mixed[] $dict
     * @return float
     */
    public function ctyiaMixedDictFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param string[] $dict
     * @return float
     */
    public function ctyiaStringArrFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param string[] $dict
     * @return float
     */
    public function ctyiaStringArrFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param bool[] $dict
     * @return float
     */
    public function ctyiaBoolArrFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param bool[] $dict
     * @return float
     */
    public function ctyiaBoolArrFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param float[] $dict
     * @return float
     */
    public function ctyiaNumArrFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param float[] $dict
     * @return float
     */
    public function ctyiaNumArrFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param mixed[] $dict
     * @return float
     */
    public function ctyiaMixedArrFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param mixed[] $dict
     * @return float
     */
    public function ctyiaMixedArrFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param string[] $dict
     * @return float
     */
    public function ctyiaStringTupleFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param string[] $dict
     * @return float
     */
    public function ctyiaStringTupleFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param bool[] $dict
     * @return float
     */
    public function ctyiaBoolTupleFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param bool[] $dict
     * @return float
     */
    public function ctyiaBoolTupleFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param float[] $dict
     * @return float
     */
    public function ctyiaNumTupleFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param float[] $dict
     * @return float
     */
    public function ctyiaNumTupleFun2($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param mixed[] $dict
     * @return float
     */
    public function ctyiaMixedTupleFun($dict) {
        return count(array_keys($dict));
    }
    /**
     * @param mixed[] $dict
     * @return float
     */
    public function ctyiaMixedTupleFun2($dict) {
        return count(array_keys($dict));
    }

    private function __construct() {
        \VK\Elephize\Builtins\Console::log(
            $this->ctyiaBoolArrFun([true, false]),
            $this->ctyiaBoolArrFun2([true, false]),
            $this->ctyiaMixedArrFun(["a", true]),
            $this->ctyiaMixedArrFun2(["2", false]),
            $this->ctyiaNumArrFun([1, 3, 4]),
            $this->ctyiaNumArrFun2([1, 3, 4]),
            $this->ctyiaStringArrFun(["a", "b"]),
            $this->ctyiaStringArrFun2(["kek", "wow"]),
            $this->ctyiaBoolDictFun([
                "a" => true,
            ]),
            $this->ctyiaBoolDictFun2([
                "a" => true,
            ]),
            $this->ctyiaMixedDictFun([
                "a" => true,
                "b" => "a",
            ]),
            $this->ctyiaMixedDictFun2([
                "a" => false,
                "b" => "2",
            ]),
            $this->ctyiaNumDictFun([
                "a" => 1,
            ]),
            $this->ctyiaNumDictFun2([
                "a" => 1,
            ]),
            $this->ctyiaStringDictFun([
                "a" => "a",
                "b" => "b",
            ]),
            $this->ctyiaStringDictFun2([
                "a" => "lol",
                "b" => "kek",
            ]),
            $this->ctyiaBoolTupleFun([true, false, false]),
            $this->ctyiaBoolTupleFun2([true, false, false]),
            $this->ctyiaMixedTupleFun(["true", true, 1]),
            $this->ctyiaMixedTupleFun2(["2", false, 1]),
            $this->ctyiaNumTupleFun([1, 2, 3]),
            $this->ctyiaNumTupleFun2([1, 2, 3]),
            $this->ctyiaStringTupleFun(["a", "b", "c"]),
            $this->ctyiaStringTupleFun2(["kek", "wow", "lol"])
        );
    }
}
