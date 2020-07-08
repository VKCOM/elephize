<?php
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class MapModule extends CJSModule {
    /**
     * @var MapModule $_mod
     */
    private static $_mod;
    public static function getInstance(): MapModule {
        if (!self::$_mod) {
            self::$_mod = new MapModule();
        }
        return self::$_mod;
    }

    public $am;
    public $bm;
    public $cm;
    public $dm;
    public $em;
    public $fmc;
    public $fm;
    public $gmc;
    public $gm;

    private function __construct() {
        $this->am = [1, 2, 3];
        $this->bm = Stdlib::arrayMap1($this->am, /* _01790d2 */ function ($el) {
            return $el * 2;
        });
        $this->cm = Stdlib::arrayMap2($this->am, /* _2edff3e */ function ($el, $idx) {
            return $el * $idx;
        });
        $this->dm = Stdlib::arrayMap1($this->am, /* _052c5e1 */ function ($el) {
            return $el * $this->am[0];
        });
        $this->em = Stdlib::arrayMap2(
            $this->am,
            /* _7b32ec5 */ function ($el, $idx) {
                $this->am[$idx] = $el * $this->am[$idx];
                return $el;
            }
        );
        $this->fmc = 0;
        $this->fm = Stdlib::arrayMap1(
            $this->am,
            /* _2e26e33 */ function ($el) {
                $this->fmc += 1;
                $this->fmc++;
                --$this->fmc;
                return $el * $this->am[0];
            }
        );
        $this->gmc = 0;
        $this->gm = Stdlib::arrayMap1(
            $this->am,
            /* _6ba598d */ function ($el) {
                $this->gmc = $el + 4;
                return $el * $this->am[0];
            }
        );
        \VK\Elephize\Builtins\Console::log($this->bm, $this->cm, $this->dm, $this->em, $this->fm, $this->fmc, $this->gm, $this->gmc);
    }
}
