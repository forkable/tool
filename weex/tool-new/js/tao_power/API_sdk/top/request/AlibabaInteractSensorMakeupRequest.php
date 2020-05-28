<?php
/**
 * TOP API: alibaba.interact.sensor.makeup request
 * 
 * @author auto create
 * @since 1.0, 2018.07.26
 */
class AlibabaInteractSensorMakeupRequest
{
	
	private $apiParas = array();
	
	public function getApiMethodName()
	{
		return "alibaba.interact.sensor.makeup";
	}
	
	public function getApiParas()
	{
		return $this->apiParas;
	}
	
	public function check()
	{
		
	}
	
	public function putOtherTextParam($key, $value) {
		$this->apiParas[$key] = $value;
		$this->$key = $value;
	}
}