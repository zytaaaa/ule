<?php
    require "conn.php";
    if(isset($_POST['$tel']) && isset($_POST['$pass'])){
    	$tel=$_POST['$tel'];
    	$pass=sha1($_POST['$pass']);
    	$result=mysql_query("select * from uleuser where tel='$tel' and mima='$pass'");
    	if(mysql_fetch_array($result)){
    		echo true;
    	}else{
    		echo false;
    	}
    }
?>