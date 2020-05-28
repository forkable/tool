<?php
/**
 * TOP API: taobao.coin.activity.budget.get request
 * 
 * @author auto create
 * @since 1.0, 2018.07.25
 */
class CoinActivityBudgetGetRequest
{
	/** 
	 * 淘金币活动ID
	 **/
	private $tbActivityId;
	
	private $apiParas = array();
	
	public function setTbActivityId($tbActivityId)
	{
		$this->tbActivityId = $tbActivityId;
		$this->apiParas["tb_activity_id"] = $tbActivityId;
	}

	public function getTbActivityId()
	{
		return $this->tbActivityId;
	}

	public function getApiMethodName()
	{
		return "taobao.coin.activity.budget.get";
	}
	
	public function getApiParas()
	{
		return $this->apiParas;
	}
	
	public function check()
	{
		
		RequestCheckUtil::checkNotNull($this->tbActivityId,"tbActivityId");
	}
	
	public function putOtherTextParam($key, $value) {
		$this->apiParas[$key] = $value;
		$this->$key = $value;
	}
}
