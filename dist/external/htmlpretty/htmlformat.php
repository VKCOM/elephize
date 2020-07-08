<?php

require_once __DIR__ . '/beautify.php';

class Beautify {
  private static $_beautifier;
  private static function _getBeautifier() {
    if (!self::$_beautifier) {
      self::$_beautifier = new Beautify_Html(array(
        'indent_inner_html' => false,
        'indent_char' => " ",
        'indent_size' => 2,
        'wrap_line_length' => 32768,
        'unformatted' => ['code', 'pre'],
        'preserve_newlines' => false,
        'max_preserve_newlines' => 32768,
        'indent_scripts'	=> 'normal' // keep|separate|normal
      ));
    }

    return self::$_beautifier;
  }

  public static function over($fn) {
    self::copy($fn, $fn);
  }

  public static function copy($fn, $target = '') {
    if (!file_exists($fn)) {
      die('No file found: ' . $fn);
    }

    if (empty($target)) {
      $target = preg_replace('#\.html?$#is', '.formatted.html', $fn);
    }

    $str = file_get_contents($fn);
    $formatted = self::_getBeautifier()->beautify($str);
    file_put_contents($target, $formatted);
  }

  public static function through($str) {
    return self::_getBeautifier()->beautify($str);
  }
}
