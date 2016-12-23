<? w('head');?>
<div class="foot">
<?php if(!empty($values)):?>
<?php foreach($values as $k=>$v):?>
    <div class="banner"><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v['images'];?>" style="text-align:center;width:100%; margin:0 auto;"></div>
<?php endforeach;endif;?>

</div>

<div class="centers">
<div class="imain">
	<div class="leftdiv">
<?php if(!empty($images)):?>
<?php foreach($images as $key=>$val):?>
		<p style="margin-top:31px;"><a href='<?php echo $val['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $val['images'];?>"></a></p>
<?php endforeach;endif;?>
<style>
*{ margin: 0px; padding: 0px; list-style:none;border:0px;}
.box{ width:120px;height:300px;}
.box ul li{width:131px;display:block;   margin:0 auto; }
.box ul li:hover ul{display:block;}
.box ul li a{text-align:left; width:96px;padding-left:30px; height:37px; margin-top:-7px;line-height:37px; display:block; text-decoration:none;}
.box ul li ul li a{width:123px;padding:0px;padding-left:8px;}
.box ul li a:hover{background:#908f94;background-image:url(../images/right8.png);}
.box ul li ul li a{text-align:left;}
.box ul li ul{display:none;position:relative; top:-40px; left:130px;}
.box ul li ul li{margin:0px 0px 2px 0px; padding:0px;  }
 .box ul li:hover{background:#908f94;background-image:url(../images/right8.png);}
 
.box ul li ul li:hover ul{visibility:visible;}
.box ul li ul li ul{visibility:hidden; position:relative; top:-40px; left:130px;}
.box ul li ul li ul li{background:#FFFFFF;}
.box ul li ul li ul li:hover{background:#908f94;background-image:url(../images/right8.png);}
 
.ggstyle ul li:hover{background:#908f94;background-image:url(../images/right8.png);}
.ggstyle ul li{text-align:left; }
.ggstyle ul li ul li{text-align:left;  }
.ggstyle ul li ul li ul{z-index:2}
.box  ul li ul{z-index:12}

</style>
        <!--左侧菜单-->
		<div  class="box ggstyle">
		 <ul style="font-family:微软雅黑,Microsoft YaHei;">
	    <li  id="show_hidden"   class="ggstyle_bg" style="height:35px;"><a class="show_hidden_a  asas" href='<?php echo base_url('Product/Genomics/Human/whole#Position');?>'>基因组学</a>
		   <ul style="width:500px;padding-left:29px;"
        	<!--<ul style="background:none;padding-left:29px;width:480px; _width:480px;*width:480px;height:270px;_height:250px;*height:250px;clear:both;z-index:9;">
			  <div style="background:#ececec;height:270px;_height:270px;*height:270px;padding:10px 20px 9px 20px;">
                <div style="opacity:1;position:absolute;">
				<li><a style="color:#105eb0;"href='<?php echo base_url('Product/Genomics/Human/whole#Position');?>'>人类基因组学</a></li>
                <li><a href="<?php echo base_url('Product/Genomics/Human/whole#Position');?>" class="thirdh">全基因组重测序</a></li>
                <li><a href="<?php echo base_url('Product/Genomics/Human/Exon#Position');?>"  >外显子测序</a></li>
                <li><a href="<?php echo base_url('Product/Genomics/Human/Target#Position');?>">目标区域测序</a></li>
                <li><a href="<?php echo base_url('Product/Genomics/Human/Tumor#Position');?>">肿瘤基因检测芯片</a></li>
				<li><a href="<?php echo base_url('Product/Genomics/Human/ctDNA#Position');?>">循环肿瘤DNA（ctDNA）检测</a></li>
				</div>
                <div style="opacity:1;position:absolute;left:200px;">				
                <li ><a style="color:#105eb0;"href='<?php echo base_url('Product/Genomics/Pa/Denovo#Position');?>'>动植物基因组学</a></li>
				<li><a href="<?php echo base_url('Product/Genomics/Pa/Denovo#Position');?>"   class="thirdh">基因组denovo测序</a></li>
                <li><a href="<?php echo base_url('Product/Genomics/Pa/Pawhole#Position');?>">全基因组重测序</a></li>
                <li class="reg_divs" id="t_tr2" ><a href="<?php echo base_url('Product/Genomics/Pa/RADSeq#Position');?>"  >简化基因组测序</a></li>
				<li class="reg_divs" id="t_tr2" ><a href="<?php echo base_url('Product/Genomics/Pa/hunchi#Position');?>"  >混池测序</a></li>
				</div>
                
                <div style="opacity:1;position:absolute;left:350px;">
				<li class="style_d" id="tr3"><a style="color:#105eb0;" href='<?php echo base_url('Product/Genomics/Microbeing/Microflora#Position');?>'>微生物基因组学</a></li>
				<li class="reg_divs" id="t_tr_3" style="width:140px;"><a href="<?php echo base_url('Product/Genomics/Microbeing/Microflora#Position');?>"  class="thirdh" style="width:140px;margin-top:1px;">微生物群落多样性分析</a></li>
                <li class="reg_divs" id="ttr3" ><a href="<?php echo base_url('Product/Genomics/Microbeing/Bac#Position');?>" >细菌基因组测序</a></li>
                <li class="reg_divs" id="t_tr3"><a href="<?php echo base_url('Product/Genomics/Microbeing/Fungi#Position');?>" >真菌基因组测序</a></li>
                <li class="reg_divs" id="t_t_r3"><a href="<?php echo base_url('Product/Genomics/Microbeing/Jzhgenegenome#Position');?>" >精准宏基因组测序</a></li>
				<li class="reg_divs" id="t_t_r_3" ><a href="<?php echo base_url('Product/Genomics/Microbeing/BMeta#Position');?>">细菌宏基因组测序</a></li>
				<li class="reg_divs" id="tt_r_3"><a href="<?php echo base_url('Product/Genomics/Microbeing/VMeta#Position');?>" >病毒宏基因组测序</a></li>
                 </div>
				 </div><span style="color:#fff;">--></span>
            </ul>
        </li> 
<li id="show_hidden1" class="ggstyle_bg"><a class="show_hidden_a" href='<?php echo base_url('Genomics/Transcriptomics/ERNA#Position');?>'>转录组学</a>
        
        	<ul style="left: 131px;width:171px; padding-left:28px;padding-top:5px;">
			  <div style="background:#ececec;background:#ececec;padding:12px 20px 6px 20px;">
                <li class="reg_divs" id="show_tr" ><a href="<?php echo base_url('Product/Transcriptomics/ERNA#Position');?>" >真核生物转录组测序</a></li>
                <li class="reg_divs" id="s_how_tr" ><a href="<?php echo base_url('Product/Transcriptomics/PRNA#Position');?>" >原核生物转录组测序</a></li>
				<li  class="reg_divs" id="sh_ow_tr" ><a href="<?php echo base_url('Product/Transcriptomics/SRNA#Position');?>" >Small RNA测序</a></li>
				<li class="reg_divs" id="sho_w_tr" ><a href="<?php echo base_url('Product/Transcriptomics/lncRNA#Position');?>">LncRNA测序</a></li>
				<li class="reg_divs" id="sho_w_tr" ><a href="<?php echo base_url('Product/Transcriptomics/zhenhe#Position');?>">真核数字基因表达谱测序</a></li>
				<li class="reg_divs" id="sho_w_tr" ><a href="<?php echo base_url('Product/Transcriptomics/hong#Position');?>">宏转录组测序</a></li>
				<li class="reg_divs" id="sho_w_tr" ><a href="<?php echo base_url('Product/Transcriptomics/CircRNA#Position');?>">CircRNA测序</a></li>
             </div>    
            </ul>
			
        </li>   
<li id="show_hidden2" class="ggstyle_bg"><a class="show_hidden_a" href='<?php echo base_url('Product/Epigenomics/Bisulfite#Position');?>'>表观组学</a>
        	<ul style="left: 131px;width:171px;padding-left:28px; padding-right:5px;">
			<div style="background:#ececec;padding:12px 20px 6px 20px;">
                <li class="reg_divs" id="show_tr1" ><a href="<?php echo base_url('Product/Epigenomics/Bisulfite#Position');?>" >全基因组甲基化测序</a> </li>
                <li class="reg_divs" id="show_t_r_1" ><a href="<?php echo base_url('Product/Epigenomics/RRBS#Position');?>"  >RRBS测序</a> </li>
                <li class="reg_divs" id="show_t_r_1" ><a href="<?php echo base_url('Product/Epigenomics/TBS#Position');?>"  >Target-BS测序</a> </li>
				<li class="reg_divs" id="show_t_r1" ><a href="<?php echo base_url('Product/Epigenomics/MeDIPseq#Position');?>" >MeDIP测序</a> </li>
				<li class="reg_divs" id="show_tr_1" ><a href="<?php echo base_url('Product/Epigenomics/ChIPseq#Position');?>" >ChIP-Seq</a> </li>
				<li class="reg_divs" id="show_t_r_1" ><a href="<?php echo base_url('Product/Epigenomics/RRHP#Position');?>" >RRHP测序</a> </li>	
				<li class="reg_divs" id="show_t_r_1" ><a href="<?php echo base_url('Product/Epigenomics/Ipseq#Position');?>" >6mA-IP Seq</a> </li>	
			  </div>
            </ul>
        </li>   
<li id="show_hidden3" class="ggstyle_bg"> <a class="show_hidden_a" href='<?php echo base_url('Product/Singlecell/Scwhole#Position');?>' >单细胞测序</a>
        	<ul style="left: 131px;width:171px;padding-left:28px; padding-top:5px;">
			<div style="background:#ececec;padding:12px 20px 5px 20px;">
                <li class="reg_divs" id="show_tr2" ><a href="<?php echo base_url('Product/Singlecell/Scwhole#Position');?>"  >单细胞全基因组测序1</a> </li>
                <li class="reg_divs" id="show_t_r2" ><a href="<?php echo base_url('Product/Singlecell/Sctranscriptome#Position');?>" >单细胞转录组测序</a> </li>
				<li class="reg_divs" id="show_t_r_2" ><a href="<?php echo base_url('Product/Singlecell/ScBS#Position');?>" >单细胞甲基化测序</a>  </li>
				<li class="reg_div" id="show_tr4" style="height:35px;"><a href='<?php echo base_url('Product/Singlecell/ScHiC#Position');?>' >单细胞Hi-C测序</a> </li> 
				<li class="reg_div" id="show_tr4" style="height:35px;"><a href='<?php echo base_url('Product/Singlecell/Gtseq#Position');?>' >单细胞G&T-Seq </a> </li>  
			  </div>
            </ul>
        </li>   
<li id="show_hidden5" class="ggstyle_bg"> <a class="show_hidden_a" href='<?php echo base_url('Product/HiC/fhic#Position');?>' >Hi-C测序</a>
        	<ul style="left: 131px;width:171px;padding-left:28px;padding-top:3px;">
			<div style="background:#ececec;padding:11px 20px 5px 20px;">
				 <li class="reg_div"  id="show_tr4" style="height:35px;"><a href='<?php echo base_url('Product/HiC/fhic#Position');?>' >动物群体细胞Hi-C测序</a> </li>
				 <li class="reg_div"  id="show_tr4" style="height:35px;"><a href='<?php echo base_url('Product/HiC/zhiwu#Position');?>' >植物群体细胞Hi-C测序</a> </li>
				 <li class="reg_div"  id="show_tr4" style="height:35px;"><a href='<?php echo base_url('Product/HiC/buhuo#Position');?>' >捕获Hi-C</a> </li>
			  </div>
            </ul>
        </li>   
<li id="show_hidden6" class="ggstyle_bg"> <a class="show_hidden_a" href='<?php echo base_url('Product/Sequencing#Position');?>'>建库测序</a>
        	<ul style="left: 131px;width:171px;padding-left:28px;padding-top:3px;">
			<div style="background:#ececec;padding:11px 20px 6px 20px;">
                <li class="reg_div" style="height:35px;" id="show_tr5" ><a href='<?php echo base_url('Product/Sequencing#Position');?>' >建库测序</a> </li>
			  </div>
            </ul>
        </li>  
<li id="show_hidden7"></li>		
    </ul>
		</div>
	</div>
<script type="text/javascript">
function getid(value){
$('.genestyle').show();
$('.rightstyle').hide();
var a_lgn_url="/Genomics/"+value.id;
$.post(a_lgn_url,{values:value.id},function(data){
		var val = '';
		jQuery.each(data.value,function(i,item){
			var oDiv = document.getElementById("contentes").innerHTML = data.locations;
			//var Color = document.getElementById(value.id).style.color = "#2a55a4";
			var opro = document.getElementById("project_val").innerHTML = item.project;
			var set = document.getElementById("list_setting").innerHTML = item.setting;
			var adv = document.getElementById("list_advant").innerHTML = item.advant;
			var har = document.getElementById("list_harm").innerHTML = item.flow;
			var flo = document.getElementById("list_flow").innerHTML = item.harm;
			var flo = document.getElementById("list_faq").innerHTML = item.faq;

		})

	},'json');
}
</script>
<div class="genestyle" style="display:none">
		<p class="p_styles">
		 <a style="font-family:微软雅黑,Microsoft YaHei;" href='<?php echo base_url();?>' style="">首页</a>
		 <a style="font-family:微软雅黑,Microsoft YaHei;" href='<?php echo base_url('Product');?>'>>产品和服务</a>
		 <span id="contentes"></span>
		</p>
		<a name="position"></a>
		<div class="constyle">
		    <h2 style="color:#2a55a4;margin-top:30px;text-align:center;font-family:微软雅黑,Microsoft YaHei;" id="project_val"><!--<?php echo $v['project'];?>--></h2>
			<!--<h5><img src="<?php echo base_url(); ?>public/2013/images/22.jpg" style="margin-left:50px;"><a href="javascript:void(0);" onclick="copyToClipBoard()">复制网址</a><img src="<?php echo base_url(); ?>public/2013/images/23.jpg"><a href="javascript:Favorite();">打印</a><img src="<?php echo base_url(); ?>public/2013/images/24.jpg"><a href="javascript:addFavorite();">收藏</a></h5>-->
			<!-- JiaThis Button BEGIN ->
			<span style="float:left;margin-left:30px;">分享到：</span>
			<div class="jiathis_style" style="margin-right:160px">
				<a class="jiathis_button_qzone"></a>
				<a class="jiathis_button_tsina"></a>
				<a class="jiathis_button_tqq"></a>
				<a class="jiathis_button_weixin"></a>
				<a class="jiathis_button_renren"></a>
				<a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jtico jtico_jiathis" target="_blank"></a>
				<a class="jiathis_counter_style"></a>
			</div>
			<script type="text/javascript" src="http://v3.jiathis.com/code/jia.js" charset="utf-8"></script>
			<!-- JiaThis Button END -->
			<div style="clear:both"></div>	
			<div style="font-family:微软雅黑,Microsoft YaHei;"><!--<?php echo $v['intro']?>--></div>
			<div class='gene_div' style="z-index:-1">
				<ul id="nave" style="font-family:微软雅黑,Microsoft YaHei;">
				   <li id="list1"><a class="current">产品简介</a></li>
				   <li id="list2"><a>技术流程</a></li>
				   <li id="list3"><a>样本要求</a></li>
				   <li id="list4"><a>案例分析</a></li>
				   <li id="list5"><a>FAQ</a></li>
				</ul>
			</div>
			<div class="ge_div">
			 <ul id="content" style="font-family:微软雅黑,Microsoft YaHei;">
				 <li id="lists1">
					<div style="margin-top:17px;" id="list_setting"><!--<?php echo $v['setting'];?>--></div>
				 </li>
				 <li id="lists2" style="display:none">
				 <div style="margin-top:17px;" id="list_advant"><!--<?php echo $v['advant'];?>--></div></li>
				 <li id="lists3" style="display:none">
				 <div style="margin-top:17px;" id="list_harm"><!--<?php echo $v['harm'];?>--></div></li>
				 <li id="lists4" style="display:none">
				 <div style="margin-top:17px;" id="list_flow"><!--<?php echo $v['flow'];?>--></div></li>
				 <li id="lists5" style="display:none">
					<style>
						#list_faq table{margin:0 auto;}
					</style>
				 <div style="margin-top:17px;" id="list_faq"><!--<?php echo $v['faq'];?>--></div></li>
			 </ul>
			 </div>
		</div>
<p id="back-to-top"><a style="font-family:微软雅黑,Microsoft YaHei;" href="#top"><span></span></a></p> 

</div>

	<div class="rightstyle">
		<p class="p_styles">
		<a style="font-family:微软雅黑,Microsoft YaHei;"  href='<?php echo base_url();?>'>首页</a>
		<a style="font-family:微软雅黑,Microsoft YaHei;"  href='<?php echo base_url('Product');?>'>>产品和服务</a>
		</p>
		<div class="u_ji" style="font-family:微软雅黑,Microsoft YaHei;">
			<div class='u_div' style="font-family:微软雅黑,Microsoft YaHei;" >
					<?php if(!empty($value1)):?>
					<?php foreach($value1 as $k1=>$v1):?>
					<dl class="u_dl">
					   <dt class="img_dt"><a href='<?php echo $v1['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v1['images'];?>"></a></dt>
					</dl>
					<?php endforeach;endif;?>

					<dl class="u_dl_b">
					   <dd><a href='<?php echo base_url('Product/Genomics/Human/whole#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  人类基因组学</a></dd>
					   <dd><a href='<?php echo base_url('Product/Genomics/Microbeing/Microflora#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  微生物基因组学</a></dd>
					</dl>
					<dl class="u_dl_b">
					   <dd><a href='<?php echo base_url('Product/Genomics/Pa/Denovo#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  动植物基因组学</a></dd>
					</dl>
			</div>
			<div class='u_div'  >
					<dl class="u_dl">
					<?php if(!empty($value2)):?>
					<?php foreach($value2 as $k2=>$v2):?>
					   <dt class="img_dt"><a href='<?php echo $v2['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v2['images'];?>"></a></dt>
					<?php endforeach;endif;?>
					</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/ERNA#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">
				     真核生物转录组测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/SRNA#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">
				     Small RNA测序</a></dd>
				</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/PRNA#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  原核生物转录组测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/lncRNA#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  LncRNA测序</a></dd>
				</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/zhenhe#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  真核数字基因表达谱测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/hong#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  宏转录组测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/Transcriptomics/CircRNA#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  CircRNA测序</a></dd>

				</dl>
			</div>
			<div class='u_div' style=" height:155px;margin-bottom:5px;">
					<dl class="u_dl">
					<?php if(!empty($value3)):?>
					<?php foreach($value3 as $k3=>$v3):?>
					   <dt class="img_dt"><a href='<?php echo $v3['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v3['images'];?>"></a></dt>
					<?php endforeach;endif;?>
					</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Epigenomics/Bisulfite#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  全基因组甲基化测序</a></dd>
				    <dd><a href='<?php echo base_url('Product/Epigenomics/RRBS#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  RRBS测序</a></dd>
					<dd><a href='<?php echo base_url('Product/Epigenomics/TBS#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  Target-BS测序</a></dd>
					<dd><a href='<?php echo base_url('Product/Epigenomics/MeDIPseq#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">  MeDIP测序</a></dd>
					
				</dl>
				<dl class="u_dl_b">
				   
				   <dd><a href='<?php echo base_url('Product/Epigenomics/ChIPseq#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">ChIP-Seq</a></dd>
				   <dd><a href='<?php echo base_url('Product/Epigenomics/RRHP#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">RRHP测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/Epigenomics/Ipseq#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">6mA-IP Seq</a></dd>

				</dl>
			</div>
			<div class='u_div'>
					<dl class="u_dl">
					<?php if(!empty($value4)):?>
					<?php foreach($value4 as $k4=>$v4):?>
					   <dt class="img_dt"><a href='<?php echo $v4['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v4['images'];?>"></a></dt>
					<?php endforeach;endif;?>
					</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Singlecell/Scwhole#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">单细胞全基因组测序2</a></dd>
				   <dd><a href='<?php echo base_url('Product/Singlecell/Sctranscriptome#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">单细胞转录组测序</a></dd>
				</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Singlecell/ScBS#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">单细胞甲基化测序</a></dd>
				</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Singlecell/Gtseq#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">单细胞G&T-Seq </a></dd>
				</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Singlecell/ScHiC#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">单细胞Hi-C测序</a></dd>
				</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Singlecell/Gtseq#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">单细胞G&T-Seq </a></dd>
				</dl>

			</div>
			<!--<div class='u_div'>
					<dl class="u_dl">
					<--?php if(!empty($value5)):?>
					<--?php foreach($value5 as $k5=>$v5):?>
					   <dt style="background:url(<--?php echo base_url(); ?>public/upload/image/<--?php echo $v5['images'];?>) no-repeat center center;width:189px;height:30px;padding-top:80px;" class="img_dt"><a href='<--?php echo $v5['url'];?>'><--?php echo $v5['title_image'];?></a></dt>
					<--?php endforeach;endif;?>
					</dl>
				<dl class="u_dl_b">
				   <dd><a href='<--?php echo base_url('Product/IRseq/CDR#Position');?>'><img src="<--?php echo base_url(); ?>public/2015/images/e.jpg">  CDR可变区测序</a></dd>
				</dl>
			</div>-->
			<div class='u_div' style="font-family:微软雅黑,Microsoft YaHei;" >
					<dl class="u_dl">
					<?php if(!empty($value6)):?>
					<?php foreach($value6 as $k6=>$v6):?>
					   <dt class="img_dt"><a href='<?php echo $v6['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v6['images'];?>"></a></dt>
					<?php endforeach;endif;?>
					</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/HiC/fhic#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">动物群体细胞Hi-C测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/HiC/zhiwu#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">植物群体细胞Hi-C测序</a></dd>
				   <dd><a href='<?php echo base_url('Product/HiC/buhuo#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">捕获Hi-C</a></dd>
				</dl>
			</div>
			<div class='u_div' style="font-family:微软雅黑,Microsoft YaHei;">
					<dl class="u_dl">
					<?php if(!empty($value7)):?>
					<?php foreach($value7 as $k7=>$v7):?>
					   <dt class="img_dt"><a href='<?php echo $v7['url'];?>'><img src="<?php echo base_url(); ?>public/upload/image/<?php echo $v7['images'];?>"></a></dt>
					<?php endforeach;endif;?>
					</dl>
				<dl class="u_dl_b">
				   <dd><a href='<?php echo base_url('Product/Sequencing#Position');?>'><img src="<?php echo base_url(); ?>public/2015/images/e.jpg">建库测序</a></dd>
				</dl>
				<!--<dl class="u_dl_b">
				   <dd><img src="<?php echo base_url(); ?>public/2015/images/102.jpg"><a href='<?php echo base_url('ContactUs');?>'>测序：测序平台、读长类型</a></dd>
				</dl>-->
			</div>
		</div>

	</div>
</div>
</div>
<? w('foot');?>
<?php $this->load->view('/common/qq');?>