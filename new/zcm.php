<?php 
// ˵����PHP д�ļ��ܺ���,֧��˽����Կ 
// ����http://www.111cn.net 
  
function keyED($txt,$encrypt_key) 
{ 
    $encrypt_key = md5($encrypt_key); 
    $ctr=0; 
    $tmp = ""; 
    for ($i=0;$i<strlen($txt);$i++) 
    { 
        if ($ctr==strlen($encrypt_key)) $ctr=0; 
        $tmp.= substr($txt,$i,1) ^ substr($encrypt_key,$ctr,1); 
        $ctr++; 
    } 
    return $tmp; 
}   
  
function encrypt($txt,$key) 
{ 
    srand((double)microtime()*1000000); 
    $encrypt_key = md5(rand(0,32000)); 
    $ctr=0; 
    $tmp = ""; 
    for ($i=0;$i<strlen($txt);$i++) 
    { 
        if ($ctr==strlen($encrypt_key)) $ctr=0; 
        $tmp.= substr($encrypt_key,$ctr,1) . (substr($txt,$i,1) ^ substr($encrypt_key,$ctr,1)); 
        $ctr++; 
    } 
    return keyED($tmp,$key); 
}   
  
function decrypt($txt,$key) 
{ 
    $txt = keyED($txt,$key); 
    $tmp = ""; 
    for ($i=0;$i<strlen($txt);$i++) 
    { 
        $md5 = substr($txt,$i,1); 
        $i++; 
        $tmp.= (substr($txt,$i,1) ^ $md5); 
    } 
    return $tmp; 
}  
  
$key = "rwer453"; 
$string = "fdsf435";   //Ҫ���ܵ�����
  
// encrypt $string, and store it in $enc_text 
$enc_text = encrypt($string,$key);   //����
  
// decrypt the encrypted text $enc_text, and store it in $dec_text 
$dec_text = decrypt($enc_text,$key);   //����  
  
  $enc_textzz = bin2hex($enc_text); //ת16
  $enc_textxx= pack("H*",$enc_textzz);//ת��ȥ
  
print "���ܵ� text : $enc_text </Br> ";print "���ܵ�ת�� text : $enc_textzz </Br> ";print "���ܵ�ת���ȥ text : $enc_textxx </Br> ";
print "���ܵ� text : $dec_text </Br> "; 
?>