<?php
	require "conn.php";
		$tel=$_POST['$tel'];
		$pass=sha1($_POST['$password']);
		$query="insert uleuser values(NULL,'$tel','$pass',NOW())";
		mysql_query($query);
?>