<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
error_reporting(E_ERROR);

$command = $_GET["command"];
$collection = $_GET["collection"];
$id = $_GET["id"];
$data = json_decode($_GET["data"], true);

$result = array();
$result["status"] = "success";

if (!$command)
    failure("No command specified. See documentation!");

if (!$collection && $command != "show")
    failure("No collection specified");

$filename = $collection.".json";

switch ($command) {
    case "create":
        create($filename);
        break;
    case "drop":
        drop($filename);
        break;
    case "show":
        show();
        break;
    case "insert": 
        insert($filename, $data);
        break;
    case "delete": 
        delete($filename, $id);
        break;
    case "find":
        find($filename, $id, $data);
        break;
    case "update":
        update($filename, $id, $data);
        break;
    default:
        failure("Unknown command");
        break;
}

// Return the result
print(json_encode($result));

// Failure message and exit
function failure($_data) {
    global $result;
    $result["status"] = "failure";
    $result["data"] = $_data;
    print(json_encode($result));
    die;
}

// Create a new collection (file)
function create($_filename) {
    if (file_exists($_filename))
        return failure("Collection already exists");

    $file = fopen($_filename, "w+");
    if (!$file)
        return failure(error_get_last()["message"]);

    if (!fwrite($file, "{}")) 
        failure(error_get_last()["message"]);
}

// Delete a collection (file)
function drop($_filename) {
    if (!unlink($_filename))
        failure(error_get_last()["message"]);
}

// Show all collections
function show() {
    global $result;
    $data = array();
    $dir = scandir("./");
    foreach($dir as $value) {
        if (substr($value, -5, 5) == ".json")
            array_push($data, substr($value, 0, -5));
    }
    $result["data"] = $data;
}

// Insert a new document into the collection
function insert($_filename, $_data) {
    if (!(is_array($_data) && array_diff_key($_data, array_keys(array_keys($_data)))))
        return failure("Invalid data format for insertion");

    if (!file_exists($_filename))
        return failure("Collection does not exist");

    $json = array();
    if (filesize($_filename) > 0)
        $json = readCollection($_filename);

    $id = uniqid(); // Generate a unique ID for the new document
    $json[$id] = $_data;
    writeCollection($_filename, $json);

    global $result;
    $result["data"] = array("id" => $id);
}

// Delete a document from the collection
function delete($_filename, $_id) {
    $json = readCollection($_filename);
    if (!isset($json[$_id]))
        return failure("ID not found");

    unset($json[$_id]);
    writeCollection($_filename, $json);
}

// Find documents in the collection
function find($_filename, $_id, $_data) {
    $json = readCollection($_filename);

    global $result;
    $found = array();

    if ($_id) {
        if (!isset($json[$_id]))
            return failure("ID not found");

        $found[$_id] = $json[$_id];
        $result["data"] = $found;
        return $found;
    }

    foreach ($json as $id => $document) {
        if (array_intersect_assoc($document, $_data) == $_data)
            $found[$id] = $document;
    }

    $result["data"] = $found;
    return $found;
}

// Update a document in the collection
function update($_filename, $_id, $_data) {
    if (!$_id)
        return failure("ID required for update");

    $json = readCollection($_filename);
    if (!isset($json[$_id]))
        return failure("ID not found");

    $document = $json[$_id];
    foreach ($_data as $key => $value)
        $document[$key] = $value;

    $json[$_id] = $document;
    writeCollection($_filename, $json);

    global $result;
    $result["data"] = array($_id => $document);
}

// Read a collection from the file
function readCollection($_filename) {
    if (!file_exists($_filename))
        return failure("Collection does not exist");

    $file = fopen($_filename, "r+");
    if (!$file)
        return failure(error_get_last()["message"]);

    $content = fread($file, filesize($_filename));
    fclose($file);

    if (!$content || $content == "{}")
        return array();

    $json = json_decode($content, true);
    if (!$json)
        failure("Invalid JSON format");

    return $json;
}

// Write a collection to the file
function writeCollection($_filename, $_json) {
    $file = fopen($_filename, "w+");
    $content = json_encode($_json, JSON_PRETTY_PRINT);
    if ($content == "[]")
        $content = "{}";

    if (!fwrite($file, $content))
        failure(error_get_last()["message"]);

    fclose($file);
    return true;
}
?>