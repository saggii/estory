<?php

// Required: anonymous function reference number as explained above.
$funcNum = $_GET['CKEditorFuncNum'] ;
// Optional: instance name (might be used to load a specific configuration file or anything else).
$CKEditor = $_GET['CKEditor'] ;
// Optional: might be used to provide localized messages.
$langCode = $_GET['langCode'] ;

// Check the $_FILES array and save the file. Assign the correct path to a variable ($url).
$message='Uploaded';
$uploadDir='/Library/WebServer/Documents/uploads/';
$uploadfile=$uploadDir.basename($_FILES['upload']['name']);
if (isset($_FILES['upload'])) {
$name = $_FILES['upload']['name'];
$move = move_uploaded_file($_FILES['upload']['tmp_name'], $uploadfile);
if(!$move){
$message = $_FILES[0]['error'];
}
}
$url='http://localhost/uploads/'.$name;
$output = '<html><body><script type="text/javascript">window.parent.CKEDITOR.tools.callFunction('.$funcNum.', "'.$url.'","testMessage");</script></body></html>';
echo $output;
?>