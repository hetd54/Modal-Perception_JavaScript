<?php
	$result_string = $_POST['postresult_string'];
	$name = $_POST['fname'];
	file_put_contents($name, $result_string, FILE_APPEND);
?>
