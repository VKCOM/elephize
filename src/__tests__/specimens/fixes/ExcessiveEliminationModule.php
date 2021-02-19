<?php
/* NOTICE: Generated file; Do not edit by hand */
use VK\Elephize\Builtins\Stdlib;
use VK\Elephize\Builtins\CJSModule;

class ExcessiveEliminationModule extends CJSModule {
    /**
     * @var ExcessiveEliminationModule $_mod
     */
    private static $_mod;
    public static function getInstance(): ExcessiveEliminationModule {
        if (!self::$_mod) {
            self::$_mod = new ExcessiveEliminationModule();
        }
        return self::$_mod;
    }

    /**
     * @param string $title
     * @return string
     */
    public function parseTitle($title) {
        $has_inline_style = strpos($title, "[/style]") !== -1;
        if ($has_inline_style) {
            $t = explode("[style", $title);
            $parsed_title = array_reduce(
                $t,
                /* _4876d8c */ function ($acc, $raw_sub_string) {
                if (strpos($raw_sub_string, "[/style]") !== -1) {
                    $found_text = Stdlib::strMatch("/\](.*?)\[\/style\]/u", $raw_sub_string);
                    $text_content = substr(explode("[/style]", $found_text[0])[0], 1);
                    $raw_style_string = explode("]", explode("[/style]", $raw_sub_string)[0])[0];
                    $key_value_pairs =
                        strpos($raw_style_string, ";") !== -1
                            ? Stdlib::arrayMap1(
                            explode(";", $raw_style_string),
                            /* _d34c464 */ function ($el) {
                            return trim($el);
                        }
                        )
                            : [trim($raw_style_string)];
                    $styles = array_reduce(
                        $key_value_pairs,
                        /* _51b824c */ function ($acc, $raw_style) {
                        $_c70ca84 = explode("=", $raw_style);
                        $key = $_c70ca84[0];
                        $value = $_c70ca84[1];
                        $acc[$key] = preg_replace("/['\"]+/u", "", $value);
                        return $acc;
                    },
                        []
                    );
                    $style_string = array_reduce(
                        array_keys($styles),
                        /* _4b73782 */ function ($acc, $key) use ($styles) {
                        $acc .= $key . ": var(--" . $key . "-" . $styles[$key] . ");";
                        return $acc;
                    },
                        ""
                    );
                    $styled_tag =
                        "<span style=\"" .
                        $style_string .
                        "\">
            " .
                        $text_content .
                        "
          </span> ";
                    $acc .= $styled_tag;
                    return $acc;
                }
                return $acc . $raw_sub_string . " ";
            },
                ""
            );
            return $parsed_title;
        }
        return $title;
    }

    private function __construct() {
    }
}
