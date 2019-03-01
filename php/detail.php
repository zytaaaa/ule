<?php
   require "conn.php";
   	  $sid=$_GET["sid"];
   	  $result=mysql_query("select * from ulepic where sid='$sid'");
   	  $list=mysql_fetch_array($result,MYSQL_ASSOC);
	  echo json_encode($list);
?>