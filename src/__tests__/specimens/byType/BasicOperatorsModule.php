<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class BasicOperatorsModule extends CJSModule {
    /**
     * @var BasicOperatorsModule $_mod
     */
    private static $_mod;
    public static function getInstance(): BasicOperatorsModule {
        if (!self::$_mod) {
            self::$_mod = new BasicOperatorsModule();
        }
        return self::$_mod;
    }

    /**
     * @var float $op1
     */
    public $op1;
    /**
     * @var float $op2
     */
    public $op2;
    /**
     * @var string $op3
     */
    public $op3;
    /**
     * @var float $op4
     */
    public $op4;
    /**
     * @var float $op5
     */
    public $op5;
    /**
     * @var float $op6
     */
    public $op6;
    /**
     * @var float $op7
     */
    public $op7;
    /**
     * @var float $op8
     */
    public $op8;
    /**
     * @var float $op10
     */
    public $op10;
    /**
     * @var float $op11
     */
    public $op11;
    /**
     * @var boolean $op12
     */
    public $op12;
    /**
     * @var boolean $op13
     */
    public $op13;
    /**
     * @var boolean $op14
     */
    public $op14;
    /**
     * @var float $op15
     */
    public $op15;
    /**
     * @var float $op16
     */
    public $op16;
    /**
     * @var float $op21
     */
    public $op21;
    /**
     * @var float $op22
     */
    public $op22;
    /**
     * @var float $op23
     */
    public $op23;
    /**
     * @var boolean $op24
     */
    public $op24;
    /**
     * @var boolean $op25
     */
    public $op25;
    public $op26;
    public $op27;
    /**
     * @var array $op28
     */
    public $op28;
    /**
     * @var float|boolean $op29
     */
    public $op29;
    /**
     * @var boolean $op31
     */
    public $op31;
    /**
     * @var boolean $op32
     */
    public $op32;
    /**
     * @var boolean $op33
     */
    public $op33;
    /**
     * @var boolean $op34
     */
    public $op34;
    /**
     * @var boolean $op35
     */
    public $op35;
    /**
     * @var boolean $op36
     */
    public $op36;
    /**
     * @var boolean $op37
     */
    public $op37;
    /**
     * @var boolean $op38
     */
    public $op38;

    private function __construct() {
        $this->op1 = 2 + 5;
        $this->op2 = 5 - 2;
        $this->op3 = 2 . "5";
        $this->op4 = 2 * 5;
        $this->op5 = 5 / 2;
        $this->op6 = 6 / 5.;
        $this->op7 = 5 % 3;
        $this->op8 = (($this->op1 + $this->op2 - $this->op4) * ($this->op5 / $this->op6)) % $this->op7;
        $this->op1 += $this->op2;
        $this->op2 -= $this->op1;
        $this->op4 *= $this->op1;
        $this->op5 /= $this->op1;
        $this->op6++;
        $this->op7--;
        $this->op10 = $this->op1 ?: $this->op4;
        $this->op11 = $this->op2 ? $this->op6 : $this->op2;
        $this->op12 = !$this->op3;
        $this->op13 = !!$this->op3;
        $this->op14 = !(!($this->op10 && $this->op11 && $this->op12) || $this->op13);
        $this->op15 = +$this->op1;
        $this->op16 = -$this->op5;
        $this->op21 = $this->op1 & $this->op2;
        $this->op22 = $this->op2 | $this->op1;
        $this->op21 &= $this->op4;
        $this->op22 |= $this->op5;
        $this->op23 = ($this->op10 * $this->op11) | 0;
        $this->op24 = true;
        $this->op25 = false;
        $this->op26 = null;
        $this->op27 = null;
        $this->op28 = $this->op25 ?: [];
        $this->op29 = $this->op1 || $this->op4 === 4;
        $this->op31 = $this->op1 == $this->op2;
        $this->op32 = $this->op1 === $this->op4;
        $this->op33 = $this->op5 != $this->op6;
        $this->op34 = $this->op5 !== $this->op7;
        $this->op35 = $this->op1 < $this->op2;
        $this->op36 = $this->op1 > $this->op4;
        $this->op37 = $this->op5 <= $this->op6;
        $this->op38 = $this->op5 >= $this->op7;
        \VK\Elephize\Builtins\Console::log(
            $this->op8,
            $this->op14,
            $this->op15,
            $this->op16,
            $this->op21,
            $this->op22,
            $this->op23,
            $this->op24,
            $this->op25,
            $this->op26,
            $this->op27,
            $this->op28,
            $this->op29,
            $this->op31,
            $this->op32,
            $this->op33,
            $this->op34,
            $this->op35,
            $this->op36,
            $this->op37,
            $this->op38
        );
    }
}
