<?php
/* NOTICE: Generated file; Do not edit by hand */
namespace VK\Elephize\src\__tests__\specimens\byType;
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class SpreadOperatorModule extends CJSModule {
    /**
     * @var SpreadOperatorModule $_mod
     */
    private static $_mod;
    public static function getInstance(): SpreadOperatorModule {
        if (!self::$_mod) {
            self::$_mod = new SpreadOperatorModule();
        }
        return self::$_mod;
    }

    /**
     * @var array $sso
     */
    public $sso;
    /**
     * @var array $ssb
     */
    public $ssb;
    /**
     * @var array $sse
     */
    public $sse;
    /**
     * @var array $ssc
     */
    public $ssc;
    /**
     * @var array $ssd
     */
    public $ssd;
    /**
     * @param array ...$args
     * @return array
     */
    public function ssff(...$args) {
        return array_merge([], $args, [
            "ssd" => $this->ssd,
        ]);
    }
    /**
     * @var array $ssf
     */
    public $ssf;
    /**
     * @var array $ssg
     */
    public $ssg;
    /**
     * @var array $ssgg
     */
    public $ssgg;

    private function __construct() {
        $this->sso = [1, 2, 3, 4];
        $this->ssb = array_merge([2, 3], $this->sso, [6]);
        $this->sse = array_merge(
            [4, 5],
            Stdlib::arrayMap1(
                $this->sso,
                /* _3b28198 */ function ($c) {
                    return $c * 2;
                }
            ),
            [7]
        );
        $this->ssc = [
            "a" => 1,
            "b" => 2,
            "c" => 3,
        ];
        $this->ssd = array_merge(
            [
                "d" => 4,
            ],
            $this->ssc,
            [
                "e" => 5,
            ]
        );
        $this->ssf = array_merge(
            [
                "h" => 6,
            ],
            $this->ssff(),
            [
                "j" => 8,
            ]
        );
        $this->ssg = $this->ssff(
            ...array_merge(["Button"], $this->ssff("test"), [
                "kek",
                [
                    "lol" => 1,
                ],
            ])
        );
        $this->ssgg = $this->ssff(
            "Button",
            "kek",
            [
                "lol" => 1,
            ],
            ...$this->ssff("test")
        );
        \VK\Elephize\Builtins\Console::log(
            $this->sso,
            $this->ssb,
            $this->ssc,
            $this->ssd,
            $this->sse,
            $this->ssf,
            $this->ssg,
            $this->ssgg
        );
    }
}
