<?php

namespace __ROOTNS__;

require_once __DIR__ . '/Builtins/CJSModule.php';
require_once __DIR__ . '/Builtins/Stdlib.php';
require_once __DIR__ . '/Builtins/ILogFacility.php';
require_once __DIR__ . '/Builtins/Console.php';
require_once __DIR__ . '/Builtins/StdOutLogFacility.php';
require_once __DIR__ . '/Builtins/Functional.php';
require_once __DIR__ . '/Builtins/RenderableComponent.php';
require_once __DIR__ . '/Builtins/IntrinsicElement.php';

// Default log facility
\__ROOTNS__\Builtins\Console::setLogFacility(new \__ROOTNS__\Builtins\StdOutLogFacility());
