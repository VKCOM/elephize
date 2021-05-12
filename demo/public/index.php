<?php
error_reporting(E_PARSE);

require_once 'autoload.php';

use VK\Elephize\Components\App_isoentry\App;

$tpl = file_get_contents('../src/layout.html');
echo str_replace('{{placeholder}}', App::getInstance()->render([], []), $tpl);
