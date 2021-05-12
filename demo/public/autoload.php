<?php

#ifndef KPHP
spl_autoload_register(function($className) {
	$base_path = 'build/';
	
	$filename = $base_path . trim(str_replace('\\','/', $className), '/') . '.php';

	if (file_exists($filename)) {
		include_once $filename;
	}
});
#endif
