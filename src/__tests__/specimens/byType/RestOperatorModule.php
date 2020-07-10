<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class RestOperatorModule extends CJSModule {
    /**
     * @var RestOperatorModule $_mod
     */
    private static $_mod;
    public static function getInstance(): RestOperatorModule {
        if (!self::$_mod) {
            self::$_mod = new RestOperatorModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $raa
     */
    public $raa;
    /**
     * @var float $ra1
     */
    public $ra1;
    /**
     * @var array $ra2
     */
    public $ra2;
    /**
     * @var float $ra3
     */
    public $ra3;
    /**
     * @var float $ra5
     */
    public $ra5;
    /**
     * @var array $ra4
     */
    public $ra4;
    /**
     * @var array $rab
     */
    public $rab;
    /**
     * @var float $rb1
     */
    public $rb1;
    /**
     * @var array $rest1
     */
    public $rest1;
    /**
     * @var float $rb2
     */
    public $rb2;
    /**
     * @var float $rb3
     */
    public $rb3;
    /**
     * @var array $rest2
     */
    public $rest2;
    /**
     * @param float $a
     * @param float $b
     * @param array ...$c
     * @return float
     */
    public function raf($a, $b, ...$c) {
        return $a +
            $b +
            array_reduce(
                $c,
                /* _9cb15a0 */ function ($acc, $v) {
                    return $acc + $v;
                },
                0
            );
    }

    private function __construct() {
        $this->raa = [1, 2, 3, 4];
        $this->ra1 = $this->raa[0];
        $this->ra2 = array_slice($this->raa, 2);
        $_e37647f = [1, 2, 3, 4, 5];
        $this->ra3 = $_e37647f[0];
        $this->ra5 = $_e37647f[2];
        $this->ra4 = array_slice($_e37647f, 3);
        $this->rab = [
            "a" => 1,
            "b" => 2,
            "c" => 3,
        ];
        $this->rb1 = $this->rab["a"];
        $this->rest1 = Stdlib::objectOmit($this->rab, ["a"]);
        $_3e8f851 = [
            "a" => 1,
            "rb3" => 2,
            "c" => 3,
            "d" => 4,
        ];
        $this->rb2 = $_3e8f851["a"];
        $this->rb3 = $_3e8f851["rb3"];
        $this->rest2 = Stdlib::objectOmit($_3e8f851, ["a", "rb3"]);
        \VK\Elephize\Builtins\Console::log(
            $this->ra1,
            $this->ra2,
            $this->ra3,
            $this->ra4,
            $this->ra5,
            $this->rb1,
            $this->rb2,
            $this->rb3,
            $this->rest1,
            $this->rest2,
            $this->raf(1, 2, 3, 4)
        );
    }
}
