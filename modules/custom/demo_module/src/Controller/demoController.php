<?php
namespace Drupal\demo_module\Controller;

class demoController{
    public function demo(){ 
        $items = array(
            array('title' => 'article 1'),
            array('title' => 'article 2'),
        );
        return array(
            '#theme' => 'demo_list',
            '#items' => $items,
            '#title' => 'title var'
        );
    }

}