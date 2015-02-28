<?php

$verb = $_SERVER['REQUEST_METHOD'];

$uri = $_SERVER['REQUEST_URI'];

$minplayers = 0;
$maxplayers = 1000;
$rank = 9999999;
$average = 0;
$maxplayingtime = 9999;
$minplayingtime = 0;
//$random_number = 9999999;


$url_parts = parse_url($uri);
$path = $url_parts["path"];
$parameters = $url_parts["query"];
parse_str($parameters);
$prefix = "api";
$ind = strpos($path, $prefix);
$request = substr($path, $ind + strlen($prefix));


if ($request == "/games") {
  if ($verb == "GET") {
    $dbhandle = new PDO("sqlite:bgg.sqlite") or die("Failed to open DB");
    
    if (!$dbhandle) die ($error);
    $query = "SELECT objectname as game, rank, average, minplayers, maxplayers, playingtime, bggbestplayers, thumbnail, image, description, categories
          from games left join extra on (games.objectid = extra.objectid)
          WHERE maxplayers <= " . $maxplayers . 
          " AND minplayers >= " . $minplayers . 
          " AND rank <= " . $rank . 
          " AND average >= " . $average .
          " AND playingtime <= " . $maxplayingtime .
          " AND playingtime >= " . $minplayingtime;
    if($rank != 9999999) $query = $query . " AND rank > 0";
    if($random_number != 0) $query = $query . " order by random() limit 0, " . $random_number;
    $statement = $dbhandle->prepare($query);
    $statement->execute();
    $results = $statement->fetchAll(PDO::FETCH_ASSOC);
    header('HTTP/1.1 200 OK');
    header('Content-Type: application/json');
    echo json_encode($results);
  
  } else {
    
    header('HTTP/1.1 404 Not Found');
  
  }
} 


else {
    
  header('HTTP/1.1 404 Not Found');

}

?>
