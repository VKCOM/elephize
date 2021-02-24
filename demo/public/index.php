<?php

use VK\Elephize\Components\App_isoentry\App;

require_once './build/bootstrap.php';
$tpl = file_get_contents('../src/layout.html');
echo str_replace('{{placeholder}}', App::getInstance()->render([], []), $tpl);
