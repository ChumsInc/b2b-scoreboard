<?php

use chums\ui\WebUI2;
use chums\user\Groups;

require_once("autoload.inc.php");

$ui = new WebUI2([
        'bodyClassName' => 'container-fluid',
        'contentFile' => 'body.inc.php',
        'requiredRoles' => [Groups::SALES, Groups::REP]
    ]
);
$ui->addCSS('public/css/styles.css', \chums\ui\CSSOptions::parse(['useTimestampVersion' => true]))
    ->addManifestJSON('public/js/manifest.json')
    ->render();
