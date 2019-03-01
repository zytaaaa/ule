<?php
	require "conn.php";
    if(isset($_POST['$tel'])){
		$telphone=$_POST['$tel'];
		$result=mysql_query("select * from uleuser where tel='$telphone'");
		if(mysql_fetch_array($result)){
			echo true;
		}else{
			echo false;
		}
	}
?>