<?php

use chums\ui\WebUI2;
use chums\user\Groups;

/**
 * @package Chums
 * @subpackage ProjectedDemands
 * @author Steve Montgomery
 * @copyright Copyright &copy; 2013, steve
 */

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
//
//$bodyPath = "apps/b2b-scoreboard";
//$title = "B2B Scoreboard";
//$description = "";
//
//$ui = new WebUI($bodyPath, $title, $description, true, 5);
//$ui->version = "2019-03-07";
//$ui->bodyClassName = 'container-fluid';
//$ui->AddCSS("public/css/styles.css");
//$ui->addManifest('public/js/manifest.json');
///**
// * Changelog:
// */
//
//
//$ui->Send();
